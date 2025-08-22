// Commect styles
import '../scss/main.scss';

import * as bodyScrollLock from 'body-scroll-lock';

// Sidebar menu
const refsMenu = {
  openMenuBtn: document.querySelector('.js-menu-open'),
  closeMenuBtn: document.querySelector('.js-menu-close'),
  overlayMenu: document.querySelector('.js-menu'),
};

const toggleMenu = () => {
  const isMenuOpen =
    refsMenu.openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
  refsMenu.openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
  refsMenu.overlayMenu.classList.toggle('is-open');

  const scrollLockMethod = !isMenuOpen
    ? 'disableBodyScroll'
    : 'enableBodyScroll';
  bodyScrollLock[scrollLockMethod](document.body);
};

refsMenu.openMenuBtn.addEventListener('click', toggleMenu);
refsMenu.closeMenuBtn.addEventListener('click', toggleMenu);

// Close the mobile menu on wider screens if the device orientation changes
window.matchMedia('(min-width: 1200px)').addEventListener('change', event => {
  if (!event.matches) return;

  refsMenu.overlayMenu.classList.remove('is-open');
  refsMenu.openMenuBtn.setAttribute('aria-expanded', false);
  bodyScrollLock.enableBodyScroll(document.body);
});

document.addEventListener('DOMContentLoaded', () => {
  const scrollContainers = document.querySelectorAll(
    '.offer-list, .partners-list'
  );

  if (!scrollContainers.length) return;

  scrollContainers.forEach(scrollContainer => {
    scrollContainer.addEventListener(
      'wheel',
      e => {
        if (
          e.deltaY !== 0 &&
          scrollContainer.scrollWidth > scrollContainer.clientWidth
        ) {
          e.preventDefault();
          scrollContainer.scrollLeft += e.deltaY;
        }
      },
      { passive: false }
    );
  });
});

const form = document.querySelector('.newletter-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Форма отправлена!');
    form.reset();
  });
}

// function initFruitFarmSlider(slider) {
// const slidesContainer = document.querySelector(".farm-cards-slides");
// const slides = document.querySelectorAll(".farm-cards-slide");
// const prevBtn = document.querySelector(".farm-cards-prev");
// const nextBtn = document.querySelector(".farm-cards-next");

// let currentIndex = 0;


// function getVisibleSlides() {
//   return window.innerWidth >= 1728 ? 3 : 2;
// }


// function getSlideWidth() {
//   const slide = slides[0];
//   const gap = window.innerWidth >= 1728 ? 24 : 12;
//   return slide.offsetWidth + gap;
// }


// function updateSlider() {
//   const slideWidth = getSlideWidth();
//   slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
// }


// nextBtn.addEventListener("click", () => {
//   const visible = getVisibleSlides();
//   if (currentIndex < slides.length - visible) {
//     currentIndex++;
//     updateSlider();
//   }
// });


// prevBtn.addEventListener("click", () => {
//   if (currentIndex > 0) {
//     currentIndex--;
//     updateSlider();
//   }
// });


// window.addEventListener("resize", () => {
//   const visible = getVisibleSlides();
//   if (currentIndex > slides.length - visible) {
//     currentIndex = slides.length - visible;
//   }
//   if (currentIndex < 0) currentIndex = 0;
//   updateSlider();
// });


// updateSlider();
// }

// document.querySelectorAll(".fruit-farm-slider").forEach(slider => {
//   initFruitFarmSlider(slider);
// });

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.farm-cards-slider');
    if (!sliders.length) return;
    sliders.forEach(initFarmCardsSlider);
  });

  function initFarmCardsSlider(root) {
    const track = root.querySelector('.farm-cards-slides');
    const items = Array.from(root.querySelectorAll('.farm-cards-slide'));
    const prev = root.querySelector('.farm-cards-prev');
    const next = root.querySelector('.farm-cards-next');
    if (!track || !items.length || !prev || !next) return;

    let index = 0;
    let step = 0;
    let visible = 2;
    let maxIndex = 0;

    const mqDesktop = window.matchMedia('(min-width: 1728px)');

    function getVisible() {
      return mqDesktop.matches ? 3 : 2;
    }

    function measure() {
      const cs = getComputedStyle(track);
      const gap = parseFloat(cs.columnGap || cs.gap || '0') || 0;

      const itemWidth = items[0]?.getBoundingClientRect().width || 0;

      step = itemWidth + gap;
      visible = getVisible();
      maxIndex = Math.max(items.length - visible, 0);

      if (index > maxIndex) index = maxIndex;
      if (index < 0) index = 0;

      update();
    }

    function update() {
      track.style.transform = `translate3d(${-index * step}px, 0, 0)`;
      prev.disabled = index <= 0;
      next.disabled = index >= maxIndex;
    }

    next.addEventListener('click', () => {
      if (index < maxIndex) {
        index++;
        update();
      }
    });

    prev.addEventListener('click', () => {
      if (index > 0) {
        index--;
        update();
      }
    });

    mqDesktop.addEventListener('change', measure);
    window.addEventListener('resize', measure, { passive: true });

    root.querySelectorAll('img').forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', measure, { once: true });
        img.addEventListener('error', measure, { once: true });
      }
    });

    requestAnimationFrame(measure);
  }
})();

