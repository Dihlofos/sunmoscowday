// "use strict";
// (function () {
//   const nav = document.querySelector('.js-nav');
//   const toggler = nav.querySelector('.js-nav-toggler');
//   const closeButton = nav.querySelector('.js-nav-close');
//   const links = nav.querySelectorAll('.js-scroll');

//   toggler.addEventListener('click', () => {
//     nav.classList.toggle('is-active');
//   })

//   links.forEach((link) => {
//     link.addEventListener('click', () => {
//       closeNav();
//     })
//   })


//   function closeNav() {
//     nav.classList.remove('is-active');
//   }


// })();



(function () {
  const nav = document.querySelector('.js-nav');
  const toggler = nav.querySelector('.js-nav-toggler');
  const closeButton = nav.querySelector('.js-nav-close');
  const links = nav.querySelectorAll('.js-scroll');
  const headerContainer = document.querySelector('.header__container');

  toggler.addEventListener('click', () => {
    nav.classList.toggle('is-active');
    headerContainer.classList.toggle('nav-open'); 
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  function closeNav() {
    nav.classList.remove('is-active');
    headerContainer.classList.remove('nav-open');
  }
})();
