'use strict';

///////////////////////////////////////
// SELECT, CREATE AND DELETE ELEMENTS

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

const allBtns = document.getElementsByTagName('button');

const message = document.createElement('div'); //Creamos un elemento (div) pero NO ESTÁ en el DOM todavía
message.classList.add('cookie-message'); // add una clase al elemento
message.innerHTML =
  'We use for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>'; //Podemos añadir elementos HTML

header.append(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

///////////////////////////////////////
// STYLES, ATTRIBUTES AND CLASSES

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // Esto no pinta nada, solo podemos leer así estilos puestos en inline

console.log(getComputedStyle(message).color); // De esta forma podemos acceder a todos los style

// Así podemos modificar los stylos
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// Modificamos "variables css"
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.designer); // Solo lee los atributos standar de html, no lee atributos custom
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// Para leer los atributos custom se usa getAttribute()
console.log(logo.getAttribute('designer'));

// Si tenemos GETTER, tb tenemos SETTER
logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company'));

// Con URL hay varias opciones
console.log(logo.src); // Ruta absoluta
console.log(logo.getAttribute('src')); // Ruta relativa
// Es muy importante lo de las rutas con los links
const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// DATA- Attributes
console.log(logo.dataset.versionNumber); // todos los atributes que empiezan por data- se almacenan en el objeto dataset

// Classes
logo.classList.add('class');
logo.classList.add('class1', 'class2', 'class3'); // Puedes añadir varias clases a la vez
logo.classList.remove('class');
logo.classList.toggle('class');
logo.classList.contains('class');

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
