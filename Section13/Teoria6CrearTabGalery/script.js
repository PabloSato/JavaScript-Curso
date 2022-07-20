'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const h1 = document.querySelector('h1');

// //Seleccionamos hijos
// console.log(h1.querySelectorAll('.highlight')); //Todos los nodos hijos con la misma clase
// console.log(h1.childNodes); // Todos los nodos hijos
// console.log(h1.children); // Todos los tags html que son hijos (directos)
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Seleccionamos padres
// console.log(h1.parentNode); // El Nodo padre
// console.log(h1.parentElement); // El Nodo padre

// //El header MÁS CERCANO al nodo
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // QuerySelector busca hijos (no importa lo profundo que busque dentro del nodo)
// // Closest() busca padres (no importa todo lo que tenga que subir en el DOM)

// // Seleccionamos hermanos
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// //Para buscar a TODOS los hermanos, subimos al padre y que busque hijos
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

///////////////////////////////////////
// Modal window
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

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  // MODERN WAY
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page Navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Match strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
