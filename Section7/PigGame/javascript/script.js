'use strict';
//ABRIMOS TERMINAL Y PONEMOS live-server para lanzar el node live server

//lo primero que hacemos es poner las puntaciones a 0 y hacer desaparcer el dado

//Seleccionamos los elementos
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Condiciones iniciales a los elementos (ponemos a 0 los elementos y q desaparezca el dado)
let scores; //Creamos un array que guardará las puntuaciones de ambos jugadores
let currentScore; //Creamos una variable que guarde la puntuación actual
let activePlayer; // Creamos una variable que guarde al jugador actual
let playing; //Creamos una variable que marca si seguimos jugando

//Creamos una función que llama a las condiciones iniciales de todo
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};
init();
//Creamos la función para cambiar de jugador
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Funcionalidad de tirar los dados
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generamos un Dado random
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display dado
    diceEl.classList.remove('hidden');
    diceEl.src = `./imgs/dice-${dice}.png`;
    //3. Comprobamos si es 1, en ese caso cambiamos de jugador
    if (dice != 1) {
      //Añadimos el valor del dado al marcador
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //cambiamos de jugador
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add la puntación actual a a puntación total del jugador activo
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Comprobamos si la puntuación total del jugador es >=100
    if (scores[activePlayer] >= 10) {
      //Se termina el juego
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //se cambia al siguiente jugador
      switchPlayer();
    }
  }
});
//funcionalidad New Game
btnNew.addEventListener('click', init);
