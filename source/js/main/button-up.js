// "use strict";
// (function () {
//   let upButton = document.querySelector(".up");

//   if (upButton) {
//     window.onscroll = function () {
//       if (window.pageYOffset > 260) {
//         upButton.classList.add("up--shown");
//       } else {
//         upButton.classList.remove("up--shown");
//       }
//     };
//   }
// })();


"use strict";
(function () {
  const upButton = document.querySelector(".up");

  if (!upButton) return;

  const mobileBreakpoint = 768; 
  const defaultBottom = 30;
  const raisedBottom = 379;
  const footerBuffer = 400; 

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const distanceToBottom = docHeight - (scrollY + windowHeight);

    if (scrollY > 260) {
      upButton.classList.add("up--shown");
    } else {
      upButton.classList.remove("up--shown");
    }

    if (window.innerWidth <= mobileBreakpoint) {
      if (distanceToBottom < footerBuffer) {
        upButton.style.bottom = `${raisedBottom}px`;
      } else {
        upButton.style.bottom = `${defaultBottom}px`;
      }
    } else {
      upButton.style.bottom = "";
    }
  });
})();

