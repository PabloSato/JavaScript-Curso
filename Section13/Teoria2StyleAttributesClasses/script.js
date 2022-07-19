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
