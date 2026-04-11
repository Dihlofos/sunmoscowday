"use strict";
(function () {
  const buttons = document.querySelectorAll('.activities__buttons .primary-btn');
  const lists = document.querySelectorAll('.activities__list');

  const showScene = (scene) => {
    lists.forEach(list => {
      list.hidden = list.dataset.scene !== scene;
    });

    buttons.forEach(button => {
      button.classList.toggle('primary-btn--active', button.dataset.scene === scene);
    });
  };

  const initial = document.querySelector('.primary-btn--active')?.dataset.scene;
  if (initial) {
    showScene(initial);
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      showScene(button.dataset.scene);
    });
  });

  const moreButtons = document.querySelectorAll('.map__more');
  moreButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetScene = btn.dataset.scene;
      const activitiesSection = document.querySelector('#activities');

      if (activitiesSection) {
        activitiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(() => {
          showScene(targetScene);
        }, 400); 
      }
    });
  });
})();
