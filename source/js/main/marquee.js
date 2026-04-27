"use strict";
(function () {
  function Marquee(selector, speed, direction) {
    const parentSelector = document.querySelector(selector);
    const clone = parentSelector.innerHTML;
    const firstElement = parentSelector.children[0];

    let i = 0;
    console.log("firstElement", firstElement);
    parentSelector.insertAdjacentHTML("beforeend", clone);
    parentSelector.insertAdjacentHTML("beforeend", clone);
    parentSelector.insertAdjacentHTML("beforeend", clone);
    parentSelector.insertAdjacentHTML("beforeend", clone);
    const lastElement = parentSelector.children[1];
    console.log("parentSelector", parentSelector.children);

    setInterval(function () {
      const directionValue = direction === "left" ? `` : `-`;
      parentSelector.style.transform = `translateX(${directionValue}${i}px)`;

      if (i > firstElement.clientWidth) {
        i = 0;
      }
      i = i + speed;
    }, 0);
  }

  //after window is completed load
  //1 class selector for marquee
  //2 marquee speed 0.2
  window.addEventListener("load", () => {
    Marquee(".js-marquee-left", 0.2, "left");
    Marquee(".js-marquee-right", 0.2, "right");
  });
})();
