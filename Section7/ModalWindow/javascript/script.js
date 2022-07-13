'use strict';
//ABRIMOS TERMINAL Y PONEMOS live-server para lanzar el node live server
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
//para seleccionar todos los elementos que comparten nombre
const btnsShowModal = document.querySelectorAll('.show-modal');
console.log(btnsShowModal);

//Creamos una funcion para que abra el modal
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
//cremos una función que cierre el modal
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
//pintamos el texto que hay en cadauno de los btns
for (let i = 0; i < btnsShowModal.length; i++)
  btnsShowModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

//add un evento al pulsar el boton ESC
document.addEventListener('keydown', function (e) {
  //le pasamos el evento a la función
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    //si la tecla apretaba es Escape && si modal NO contiene la clase hidden
    closeModal();
  }
});
