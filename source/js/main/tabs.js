"use strict";
(function () {
  const container = document.querySelector(".js-tabs");
  const tabs = container.querySelectorAll(".js-tab");
  const contents = container.querySelectorAll(".js-tab-content");

  const activeClass = "is-active";

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.dataset.tab;
      setActiveTab(targetTab);
    });
  });

  function resetTabs() {
    tabs.forEach((tab) => {
      tab.classList.remove("is-active");
    });
  }

  function resetContents() {
    contents.forEach((tab) => {
      tab.classList.remove("is-active");
    });
  }

  function setActiveTab(number) {
    resetTabs();
    resetContents();

    const targetTab = container.querySelector(`.js-tab[data-tab="${number}"]`);
    const targetContent = container.querySelector(
      `.js-tab-content[data-tab="${number}"]`,
    );

    if (targetTab && targetContent) {
      targetTab.classList.add(activeClass);
      targetContent.classList.add(activeClass);
    }
  }
})();
