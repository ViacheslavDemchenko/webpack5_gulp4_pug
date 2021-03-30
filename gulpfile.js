const gulp = require('gulp'),
    pug = require('gulp-pug'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    htmlhint = require('gulp-htmlhint'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    gcmq = require('gulp-group-css-media-queries'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),
    imgmin = require('gulp-tinypng-nokey'),
    newer = require('gulp-newer'),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    webp = require('gulp-webp'),
    browserSync = require('browser-sync').create(),
    webpack = require('webpack-stream');


/* FILES PATHS */

// Current project name
let themePath = 'twentytwenty-child';

const paths = {
    prod: {
        build: './build'
    },
    pug: {
        src: './src/pages/*.pug',
        dest: './build',
        watch: ['./src/components/**/*.pug', './src/mixins-pug/**/*.pug', './src/pages/**/*.pug']
    },
    scss: {
        src: ['./src/scss/**/*.scss', './src/components/**/*.scss'],
        dest: `./build/wp-content/themes/${themePath}/css`,
        watch: ['./src/scss/**/*.scss', './src/components/**/*.scss']
    },
    js: {
        src: './src/js/index.js',
        dest: `./build/wp-content/themes/${themePath}/js`,
        watch: './src/js/**/*.js'
    },
    images: {
        src: ['./src/img/**/*', '!./src/img/**/*.svg', '!./src/img/**/*.webp'],
        dest: `./build/wp-content/themes/${themePath}/img`,
        watch: ['./src/img/**/*', '!./src/img/**/*.svg', '!./src/img/**/*.webp']
    },
    webpImages: {
        src: './src/img/**/*.webp',
        dest: `./build/wp-content/themes/${themePath}/img`,
        watch: './src/img/**/*.webp'
    },
    svgSprite: {
        src: './src/img/icons/**/*.svg',
        dest: `./build/wp-content/themes/${themePath}/img/icons`,
        watch: './src/img/icons/**/*.svg'
    },
    svg: {
        src: ['./src/img/**/*.svg', '!./src/img/icons/**/*.svg'],
        dest: `./build/wp-content/themes/${themePath}/img/icons`,
        watch: ['./src/img/**/*.svg', '!./src/img/icons/**/*.svg']
    },
    fonts: {
        src: './src/fonts/**/*',
        dest: `./build/wp-content/themes/${themePath}/fonts`,
        watch: './src/fonts/**/*'
    },
    php: {
        src: './src/php/**/*.php',
        dest: `./build/wp-content/themes/${themePath}/php`,
        watch: './src/php/**/*.php'
    },
    video: {
        src: './src/video/**/*.*',
        dest: `./build/wp-content/themes/${themePath}/video`,
        watch: './src/video/**/*.*'
    }
};

// Project build type (development or production)
let isDev = true; // Оставить true для development или заменить на false production версии сборки проекта
let isProd = !isDev;

/* 
Название конечного js-файла для development или production версии сборки 
Подключить соответствующее имя файла на нужных страницах (например, index.pug или index.html)
*/
let jsFilename = isDev ? 'main.js' : 'main.min.js';

/* Webpack options */
let webpackConfig = {
    output: {
        filename: jsFilename
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/' // Не обязательно (для вытягивания откомпелированного в babel кода из зависимостей)
            }
        ]
    },
    optimization: {
        minimize: isProd
    },
    devServer: {
        overlay: true, // Вывод ошибки на оверлей на экране
        open: true // Открытие проекта в браузере при запуске в development режиме
    },
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'source-map' : 'none'
};

/* TASKS */

/* PUG TO HTML & MINIFICATION */

gulp.task('pug', () => {
    return gulp.src(paths.pug.src)
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
        .pipe(htmlhint.failOnError())
        //.pipe(htmlmin({
        //    collapseWhitespace: true  //Минификация html (по умолчанию отключена)
        //}))
        .pipe(gulp.dest(paths.pug.dest))
        .pipe(browserSync.stream())
});

/* SCSS TO CSS CONVERTATION & MINIFICATION */

gulp.task('styles', () => {
    return gulp.src(paths.scss.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.scss'))
        .pipe(sass())
        .pipe(autoprefixer({
            Browserslist: ['> 1%, not dead'],
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(cleanCSS())
        .pipe(rename('main.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(browserSync.stream())
});

/* JAVASCRIPT MINIFICATION VIA WEBPACK */

gulp.task('scripts', () => {
    return gulp.src(paths.js.src)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.stream())
});

/* IMAGES MINIFICATION */

gulp.task('imgmin', () => {
    return gulp.src(paths.images.src)
        .pipe(plumber())
        .pipe(newer(paths.images.dest))
        .pipe(imgmin())
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/* IMAGES JPG/JPEG & PNG TO WEBP CONVERTATION */

gulp.task('webp', () => {
    return gulp.src(paths.images.src)
        .pipe(plumber())
        .pipe(newer(paths.images.dest))
        .pipe(webp())
        .pipe(gulp.dest(paths.images.dest))
});

/* SVG SPRITES */

gulp.task('sprites', () => {
    return gulp.src(paths.svgSprite.src)
        .pipe(plumber())
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: ($) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {
                xmlMode: true
            }
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(gulp.dest(paths.svgSprite.dest))
});

/* SVG MINIFICATION */

gulp.task('svg', () => {
    return gulp.src(paths.svg.src)
        .pipe(plumber())
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(gulp.dest(paths.svg.dest))
});

/* FONTS MOVING TO BUILD */

gulp.task('fonts', () => {
    return gulp.src(paths.fonts.src)
        .pipe(plumber())
        .pipe(gulp.dest(paths.fonts.dest))
});

/* PHP MOVING TO BUILD */

gulp.task('php', () => {
    return gulp.src(paths.php.src)
        .pipe(plumber())
        .pipe(gulp.dest(paths.php.dest))
});

/* VIDEO MOVING TO BUILD */

gulp.task('video', () => {
    return gulp.src(paths.video.src)
        .pipe(plumber())
        .pipe(gulp.dest(paths.video.dest))
});

/* BUILD FOLDER ERASE */

gulp.task('clean', () => {
    return del(paths.prod.build);
});

/* BROWSER SYNC */

function reload(done) {
  browserSync.reload({ stream: true });
  done();
}

gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: paths.prod.build
        },
        reloadOnRestart: true
    });
    gulp.watch(paths.pug.watch, gulp.series('pug', reload));
    gulp.watch(paths.scss.watch, gulp.series('styles', reload))
    gulp.watch(paths.js.watch, gulp.series('scripts', reload));
    gulp.watch(paths.images.watch, gulp.series('imgmin', reload));
    gulp.watch(paths.images.watch, gulp.series('webp', reload));
    gulp.watch(paths.svgSprite.watch, gulp.series('sprites', reload));
    gulp.watch(paths.svg.watch, gulp.series('svg', reload));
    gulp.watch(paths.fonts.watch, gulp.series('fonts', reload));
    gulp.watch(paths.php.watch, gulp.series('php', reload));
    gulp.watch(paths.video.watch, gulp.series('video', reload));
});

/* PROJECT TASK DEVELOPMENT QUEUE */

gulp.task('dev', gulp.series(
    'pug',
    'styles',
    'scripts',
    'imgmin',
    'webp',
    'sprites',
    'svg',
    'fonts',
    'php',
    'video'
));

gulp.task('prod', gulp.series(
    'clean',
    'pug',
    'styles',
    'scripts',
    'imgmin',
    'webp',
    'sprites',
    'svg',
    'fonts',
    'php',
    'video'
));

/* START DEVELOPMENT GULP */

gulp.task('default', gulp.series(
    'dev', 'server'
));

/* START PRODUCTION GULP */

gulp.task('prod', gulp.series(
    'prod', 'server'
));
