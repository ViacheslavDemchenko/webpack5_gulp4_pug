// export default function mobileMenu() {

//   const burger = document.querySelector('.burger');
//   const navMenu = document.querySelector('.nav--mb');
//   const navLinks = document.querySelectorAll('.nav--mb a');
//   const htmlTag = document.documentElement;


//   if (burger && navMenu) {
//     burger.addEventListener('click', function() {
//       navMenu.classList.toggle('nav--mb-active');
//       burger.classList.toggle('burger--active');
//       htmlTag.classList.toggle('no-scroll');
//     });

//     // Закрытие меню при клике на любую ссылку
//     navLinks.forEach(link => {
//       link.addEventListener('click', function() {
//         navMenu.classList.remove('nav--mb-active');
//         burger.classList.remove('burger--active');
//         htmlTag.classList.remove('no-scroll');
//       });
//     });

//     // Автоматическое закрытие меню при изменении размера окна
//     window.addEventListener('resize', function() {
//       if (window.innerWidth >= 1200) {
//         navMenu.classList.remove('nav--mb-active');
//         burger.classList.remove('burger--active');
//         htmlTag.classList.remove('no-scroll');
//       }
//     });

//   }

//     // if(document.getElementById('.burger')) {
//     //     const hamburger = document.getElementById('.burger');
//     //     const mobileMenuItems = document.querySelectorAll('.menu li a');
//     //     const htmlElement = document.getElementsByTagName('html')[0];
//     //     const mobileMenu = document.querySelector('.nav--mb');

//     //     const body = document.body;
//     //     let screenWidth = window.innerWidth;

//     //     hamburger.addEventListener('click', () => {
//     //       console.log('Yes');
//     //         hamburger.classList.toggle('active');
//     //         mobileMenu.classList.toggle('nav--mb-active');
//     //         body.classList.toggle('no-scroll');
//     //         htmlElement.classList.toggle('no-scroll');
//     //     });

//     //     window.addEventListener('resize', () => {
//     //         screenWidth = window.innerWidth;

//     //         if (screenWidth < 1024) {
//     //             linksClick();
//     //         }
    
//     //         if (screenWidth >= 1024) {
//     //             hamburger.classList.remove('active');
//     //             mobileMenu.classList.remove('nav--mb-active');
//     //             body.classList.remove('no-scroll');
//     //             htmlElement.classList.remove('no-scroll');
//     //         } 
//     //     });

//     //     function linksClick() {
//     //         mobileMenuItems.forEach(link => {
//     //             link.addEventListener('click', (e) => {
//     //                 if (screenWidth < 1024) {
//     //                     hamburger.classList.remove('active');
//     //                     mobileMenu.classList.remove('nav--mb-active');
//     //                     body.classList.remove('no-scroll');
//     //                     htmlElement.classList.remove('no-scroll');
//     //                 }
//     //             });
//     //         });
//     //     }
//     //     linksClick();
//     // }
// }
