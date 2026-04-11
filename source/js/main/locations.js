

"use strict";
(async function () {
  const locations = [
    {
      name: "Парк Музеон",
      index: 1,
      coords: [37.606871, 55.734594],
    },
    {
      name: "Сцена «NOVA»",
      index: 2,
      coords: [37.608203, 55.736464],

    },
    {
      name: "Парковка Новой Третьяковки",
      index: 3,
      coords: [37.604486, 55.733926],
    },
    {
      name: "Летний кинотеатр Музеона",
      index: 4,
      coords: [37.609811, 55.737324],
    }, 
    {
      name: "Терраса у фонтана",
      index: 5,
      coords: [37.604699, 55.735315],
    },
    {
      name: "Парк Музеон",
      index: 6,
      coords: [37.606097, 55.734020], 
    },
   //  {
   //    name: "Мясницкая ул. Площадь et cetera",
   //    index: 6,
   //    coords: [37.636814, 55.764688],
   //  },
   //  // {
    //   name: "Никольская улица",
    //   index: 7,
    //   coords: [37.623631, 55.7579],
    // },
    // {
    //   name: "Новая площадь",
    //   index: 8,
    //   coords: [37.628433, 55.757729],
    // },
   //  {
   //    name: "Плошадь революции",
   //    index: 9,
   //    coords: [37.619845, 55.757863],
   //  },
   //  {
   //    name: "Большая никитинская, площадь тасс",
   //    index: 10,
   //    coords: [37.599498, 55.757587],
   //  },
   //  {
   //    name: "Кудринская площадь",
   //    index: 11,
   //    coords: [37.582924, 55.758762],
   //  },
   //  {
   //    name: "Ильинский сквер, китай-город",
   //    index: 12,
   //    coords: [37.633897, 55.754608],
   //  },
    // {
    //   name: "ПАРК ГОРЬКОГО",
    //   index: 13,
    //   coords: [37.601848, 55.730188],
    // },
   //  {
   //    name: "Старый арбат",
   //    index: 14,
   //    coords: [37.591089, 55.749554],
   //  },
   //  {
   //    name: "Калошин переулок",
   //    index: 15,
   //    coords: [37.592132, 55.748468],
   //  },
  ];

const activeString = "is-active";

// content constants
const contentContainer = document.querySelector(".js-content-night-container");
const contentsEls = contentContainer?.querySelectorAll(".js-content") || [];
const contentLeftArrow = contentContainer?.querySelector(".js-content-arrow-left");
const contentRightArrow = contentContainer?.querySelector(".js-content-arrow-right");

// map constants
const legend = document.querySelector(".js-legend");
const legendItems = legend?.querySelectorAll(".js-legend-item") || [];
const legendLinks = legend?.querySelectorAll(".js-legend-link") || [];

const mapInstance = await initMap();

// Навигация по контенту (стрелки)
contentLeftArrow?.addEventListener("click", () => {
  const currentIndex = getActiveContentIndex();
  if (currentIndex > 1) setActiveLocation(currentIndex - 1);
});

contentRightArrow?.addEventListener("click", () => {
  const currentIndex = getActiveContentIndex();
  if (currentIndex < contentsEls.length) setActiveLocation(currentIndex + 1);
});

// Клики по пунктам легенды
legendItems.forEach((item) => {
  item.addEventListener("click", () => {
    setActiveLegend(Number(item.dataset.thumbIndex));
  });
});

legendLinks.forEach((item) => {
  item.addEventListener("click", () => {
    const itemIndex = Number(item.dataset.thumbIndex);
    setActiveLocation(itemIndex);
  });
});

function getActiveContentIndex() {
  const active = [...contentsEls].find((el) =>
    el.classList.contains(activeString)
  );
  return Number(active?.dataset.contentIndex) || 1;
}

function setActiveLegend(index) {
  clearLegendItems();
  const legendItem = [...legendItems].find(
    (item) => Number(item.dataset.thumbIndex) === index
  );
  const markers = document.querySelectorAll(".js-marker");
  const selectedMarker = [...markers].find(
    (marker) => Number(marker.dataset.thumbIndex) === index
  );

  clearMarkers();
  selectedMarker?.classList.add("is-active");
  legendItem?.classList.add(activeString);

  const selectedLocation = locations.find((location) => location.index === index);
  mapInstance.setLocation({
    center: selectedLocation.coords,
    zoom: 17,
    duration: 200,
    easing: "ease-in-out",
  });
}

function clearLegendItems() {
  legendItems.forEach((item) => {
    item.classList.remove(activeString);
  });
}

function clearContents() {
  contentsEls.forEach((item) => {
    item.classList.remove(activeString);
  });
}

function setActiveLocation(index) {
  clearLegendItems();
  clearContents();

  const contentItem = [...contentsEls].find(
    (item) => Number(item.dataset.contentIndex) === index
  );

  contentItem?.classList.add(activeString);
  reinitSlider(document.querySelector(`[data-content-index="${index}"]`));
}

async function initMap() {
  const vw = window.innerWidth;
  await ymaps3.ready;

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapMarker,
    YMapDefaultFeaturesLayer,
  } = ymaps3;

  const map = new YMap(
    document.querySelector(".js-map"),
    {
      location: {
        center: [37.618435, 55.74713],
        zoom: vw > 767 ? 13 : 12,
      },
    },
    [new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({})]
  );

  locations.forEach((location) => {
    const markerElement = document.createElement("div");
    markerElement.className = "map__marker js-marker";
    markerElement.innerText = location.index;
    markerElement.dataset.thumbIndex = location.index;

    const marker = new YMapMarker(
      {
        coordinates: location.coords,
        draggable: false,
        mapFollowsOnDrag: false,
      },
      markerElement
    );

    map.addChild(marker);

    markerElement.addEventListener("click", () => {
      setActiveLegend(location.index);
      const legendItem = [...legendItems].find(
        (item) => Number(item.dataset.thumbIndex) === location.index
      );
      legend.scrollTop = findPosition(legendItem) - findPosition(legend);
      clearMarkers();
      markerElement.classList.add("is-active");
    });
  });

  return map;
}

function clearMarkers() {
  const markers = document.querySelectorAll(".js-marker");
  markers.forEach((marker) => {
    marker.classList.remove("is-active");
  });
}

function findPosition(el) {
  let offsetTop = 0;
  while (el) {
    offsetTop += el.offsetTop;
    el = el.offsetParent;
  }
  return offsetTop;
}

})();

 

