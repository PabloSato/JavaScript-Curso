'use strict';
//USO DE FUNCIONES PARA GUARDAR CÓDIGO REPETIDO
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    displayMessage('No es un número 👹');
  } else if (guess === secretNumber) {
    displayMessage('🎉🤩 ¡Número Correcto! 🎉🤩');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    if (score > highScore) {
      highScore = score;
    }
    document.querySelector('.highscore').textContent = highScore;
  } else if (guess != secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '¡Muy Alto! 📈' : '¡Muy Bajo! 📉');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥 ¡Has Perdido! 💥');
      document.querySelector('.score').textContent = 0;
    }
  }
});
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  displayMessage('Start guessing...');

  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
});
