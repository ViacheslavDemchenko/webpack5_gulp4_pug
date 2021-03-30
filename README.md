Простая сборка на Webpack 5 + Gulp 4 + SCSS под Wordpress
<<<<<<< HEAD

Руководство по использованию сборки:

1.Плагины

gulp - основной плагин галпа;
gulp-pug - плагин преобразования кода на pug в html;
del - плагин для удаления файлов и папок;
gulp-plumber - плагин для предотвращения остановку выполнения тасков в случае ошибки;
gulp-rename - плагин переименования файлов;
gulp-concat - плагин объединения файлов;
gulp-htmlhint - плагин HTML валидатора;
gulp-htmlmin - плагин минификации HTML (отключен по дефолту);
gulp-sass - плагин компиляции sass/scss в css
gulp-autoprefixer - плагин добавления автопрефиксов;
gulp-group-css-media-queries - плагин объединения классов по медиа запросам для отсутствия дублирования кода;
gulp-sourcemaps - плагин генерации карты css файлов;
gulp-clean-css - плагин минификации css (в том числе удаляет лишние пробелы и переводы строк);
gulp-tinypng-nokey - плагин оптимизации изображений через сервис TinyPng (без необходимости использования ключа);
gulp-newer - плагин, позволяющий осуществлять определенные действия только к новым или измененным файлам, а также к новым добавленным в проект изображениям;
gulp-svg-sprite - плагин создания svg-спрайта;
gulp-svgmin - плагин оптимизации svg-изображений;
gulp-cheerio - плагин удаления лишних атрибутов из svg-изображений;
gulp-replace - плагин позволяет заменить текст в файлах перед его публикацией (в сборке используется при очистке svg-изображений от определенных внутренних стилей);
gulp-webp - плагин преобразования изображений в формат webp;
browser-sync - утилита отслеживания изменений в файлах и автоматического обновления страницы браузера;
webpack-stream - плагин для синхронизации webpack с gulp.

2.Структура проекта

2.1 Папка src/components 
Включает две папки - bem-blocks и sections. Первая предназначена для хранения отдельных блоков, созданных с использованием методологии БЭМ. Вторая - для размещения секций. Блоки могут инклюдиться друг в друга и в секции. 

2.2 Папка fonts
Предназначена для харнения файлов шрифтов и их подключения в общий файл fonts.css через @font-face.

2.3 Папка img
Включает папку icons, в которую помещаются иконки, для объединения в sprite.svg. Все другие изображения и иконки, которые предполагается вставлять через тег img или фонов в css, размещаются в общей папке img. 

После сборки файл sprite.svg и иконки не включенные в него располагаются в папке:
build/wp-content/themes/название текущего проекта\img\icons

Все остальные изображения в общей папке img:
build/wp-content/themes/название текущего проекта\img\

2.4 Папка js
Содержит папки - libs, modules и файл index.js. Первая предназначена для размещения файлов сторонних библиотек и плагинов (слайдеры, галереи т.д.).
Вторая - для модулей.
В файл index.js импортятся все модули и библиотеки. Он является входной точкой для webpack.

2.5 Папка layouts
Включает templates страниц, на базе которых с помощью pug и функции extends можно создавать похожие по структуре страницы. В ней также расположены templates для header и footer. 

2.6 Папка mixins-pug
Предназначена для размещения паг-миксинов.

2.7 Папка pages
В ней хранятся все отдельные страницы проекта, в которые могу инклюдиться секции и блоки из папок components/bem-blocks и components/sections, а также templates для header и footer из папка layouts

2.8 Папка php
Для php-файлов (например, отправка почты, если проект не предусматривает использования CMS, а представляет собой простой лендинг).

2.9 Папка scss
Содержит папки global (файлы глобальных стилей) и libs (файлы стилей для сторонних плагинов и библиотек, таких как слайдеры, галереи и т.д.).

В папку global входят следующие файлы:

base - общие стили для body, html, контейнеров и т.д.;
global - дополнительные стили и сброс некоторых дефолтных стилей браузера, не вошедших в normalize;
mixins - scss миксины, в том числе для медиазапросов и шрифтов;
normalize - сброс ряда дефолтных стилей браузера;
variables - файл для размещения переменных.

3 Папка video
Для размещения видеофайлов.

4 Прочие файлы

.babelrc - настройки для babel;
.gitignore - перечень файлов, не подлежащих загрузке на GitHub;
gulpfile.js - таски для gulp и настройки сборки под текущий проект;
package.json - файл зависимостей;
webpack.config.js - файл настроек для webpack.

5 Подготовка сборки к новому проекту и запуск

5.1 В файле gulpfile.js установить Current project name, прописав его в переменную themePath.

5.2 В файле gulpfile.js оставить по умолчанию переменную let isDev = true в разделе Project build type (development or production). В этом случае будет создаваться не минифиированные css и js файлы с sourcemaps. При изменении isDev = false будет запускаться production версия сборки с минифицированными файлами css и js без sourcemaps.

5.3 Прописать ссылки на файлы css, js и fonts в файлах 
src/layouts/head.pug и src/layouts/footer.pug соответственно. Ссылка должна иметь вид:
./wp-content/themes/название текущего проекта/fonts/fonts.css
./wp-content/themes/название текущего проекта/css/main.css
./wp-content/themes/название текущего проекта/js/main.js

6 Запуск сборки 
После скачивания сборки с GitHub и установки всех зависимостей командой в консоли npm i запуск сборки осуществляется командой gulp.

Для удаления папки build имеется команда gulp del.
=======
Тест
>>>>>>> 7eb44897c47d3914d14f00d884b951b8c643caab
