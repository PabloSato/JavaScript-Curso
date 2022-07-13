'use strict';
//ABRIMOS TERMINAL Y PONEMOS live-server para lanzar el node live server
//los emojis se ponen con cmd+ctrl+space

//CODE CHALLENGE #2

//Es una función inmediata que se ejecuta directamente. Eso pondrá el h1 en rojo y añadirá un listener al body
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
