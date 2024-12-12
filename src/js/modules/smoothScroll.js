// export default function smoothScroll() {

//   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();

//         const targetID = this.getAttribute('href');
//         const targetElement = document.querySelector(targetID);

//         if (targetElement) {
//             const headerOffset = 0; // Смещение для заголовка (можно изменить при необходимости)
//             const elementPosition = targetElement.getBoundingClientRect().top;
//             const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

//             window.scrollTo({
//                 top: offsetPosition,
//                 behavior: "smooth" // Плавная прокрутка
//             });
//         }
//     });
// });

// }