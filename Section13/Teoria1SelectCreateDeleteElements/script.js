'use strict';

///////////////////////////////////////
// SELECT, CREATE AND DELETE ELEMENTS

// SELECTING ELEMENTS
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allBtns = document.getElementsByTagName('button');
console.log(allBtns);

console.log(document.getElementsByClassName('btn'));

// CREATING AND INSERTING ELEMENTS
// .insertAdjacentHTML => Q&A
const message = document.createElement('div'); //Creamos un elemento (div) pero NO ESTÁ en el DOM todavía
message.classList.add('cookie-message'); // add una clase al elemento
// message.textContent = 'We use for improved functionality and analytics'; // Podemos añadir texto al elemento
message.innerHTML =
  'We use for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>'; //Podemos añadir elementos HTML

// header.prepend(message); //prepend() sirve para insertar antes del resto de childsNodes del elemento!!! Lo convierte en el primer hijo
// con append() se convertiría en el lastChild del Elemento
//Para poder insertar varias veces EL MISMO ELEMENTO, necesitamos el cloneNode(), que realiza una copia
//header.append(message.cloneNode(true)); //Con true decimos que también copie todos los childsNode del elemento

header.append(message);

//header.before(message); //Lo inserta ANTES del elemento header (como su hermano)
//header.after(message); // Lo inserta DESPUÉS del elemento header (como su hermano)

// DELETE ELEMENTS
//Borramos el mensage de las cookies al pulsar el botón
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

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
