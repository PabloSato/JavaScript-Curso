'use strict';

///////////////////////////////////////
// SELECT, CREATE AND DELETE ELEMENTS

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');

// const allBtns = document.getElementsByTagName('button');

// const message = document.createElement('div'); //Creamos un elemento (div) pero NO ESTÁ en el DOM todavía
// message.classList.add('cookie-message'); // add una clase al elemento
// message.innerHTML =
//   'We use for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>'; //Podemos añadir elementos HTML

// header.append(message);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// ///////////////////////////////////////
// // STYLES, ATTRIBUTES AND CLASSES

// // Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// IMPLEMENTANDO SMOOTH SCROLL
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

  console.log(
    'heigt/width viewport ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // -------- Scrolling --------
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );
  // OLD WAY
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // MODERN WAY
  section1.scrollIntoView({ behavior: 'smooth' });
});

// ------------- EVENTS AND EVENTS HANDLERS -------------

const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEventListener: Greate!! Hay está el tio!');
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

// Otra forma de atar un eventListener a un elemento
// la mejor forma es addEventListener
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Greate!! Hay está el tio!');
// };

// ----------- EVENT BUBLING -----------
