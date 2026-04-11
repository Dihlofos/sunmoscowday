"use strict";
(function () {
  const togglers = document.querySelectorAll(".js-faq-toggler");
  if (!togglers.length) return;

  togglers.forEach((toggler) => {
    toggler.addEventListener("click", (event) => {
      const target = event.currentTarget;
      if (!target) return;

      // ZONES 
      const zoneItem = target.closest(".zones__item");
      const content = target.nextElementSibling;

      if (zoneItem) {
        document.querySelectorAll(".zones__item").forEach((otherItem) => {
          if (otherItem !== zoneItem) {
            otherItem.classList.remove("active");
            const otherContent = otherItem.querySelector(".zones__content");
            const otherButton = otherItem.querySelector(".zones__toggler");
            otherContent?.classList.remove("active");
            otherButton?.classList.remove("active");
          }
        });

        target.classList.toggle("active");
        content?.classList.toggle("active");
        zoneItem.classList.toggle("active");
        return; 
      }

      // FAQ 
      const faqItem = target.closest(".faq__item");
      const faqContent = target.nextElementSibling;

      target.classList.toggle("active");
      faqContent?.classList.toggle("active");
      faqItem?.classList.toggle("active");
    });
  });
})();
