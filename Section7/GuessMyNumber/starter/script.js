'use strict';
//DOM - MANIPULATION
/*
//Obtenemos el texto que hay en el objeto con el la clase ".message"
console.log(document.querySelector('.message').textContent);
//Cambiamos el valor del texto que hay en el objeto con clase ".message"
document.querySelector('.message').textContent = 'Correcto!🎉';

//Seleccionamos los objetos con las clases ".number" y ".score" y cmabiamos su valor
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 20;
//Seleccionamos el objeto con la clase ".guess" y lo pintamos por consola
//(da vacio)
console.log(document.querySelector('.guess').value);
//le damos un valor (usamos value al ser un input) y lo volvemos a pintar
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/
//DOM - EVENT LISTENER

//Definimos el numero secreto de forma aleatoria
//Math.trunc = quita los decimales
//Math.random() = nos devuelve un número aleatorio entre 0 y 1
//Math.random()*20 = nos devuelve un número aleatorio entre 0 y 19
//(Math.random()*20)+1 = nos devuelve un número aleatorio entre 1 y 20
let secretNumber = Math.trunc(Math.random() * 20) + 1;
//document.querySelector('.number').textContent = secretNumber; //Con esto lo pondríamos a la vista

//Creamos una variable para que guarde el Score
//Debe ser let ya que const es constante
let score = 20;
let highScore = 0;
//Seleccionamos el objeto que va a escuchar el evento
//como tiene dos clases, nos quedamos con la más especifica
document.querySelector('.check').addEventListener('click', function () {
  //console.log(document.querySelector('.guess').value); //Si pinchamos en el boton check, nos pinta el valor metido por consola
  const guess = Number(document.querySelector('.guess').value); //parseamos a number, ya que nos devuelve un string
  console.log(guess, typeof guess);

  //Si el valor metido no es un número (0 no sería permitido tampoco), sacamos un mensaje
  if (!guess) {
    document.querySelector('.message').textContent = 'No es un número 👹';
  } else if (guess === secretNumber) {
    // si acierta el numero secreto
    document.querySelector('.message').textContent =
      '🎉🤩 ¡Número Correcto! 🎉🤩';
    //para cambiar el bg del body
    document.querySelector('body').style.backgroundColor = '#60b347';
    //hacemos un poco más grande la caja del number
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    if (score > highScore) {
      highScore = score;
    }
    document.querySelector('.highscore').textContent = highScore;
  } else if (guess != secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent =
        guess > secretNumber ? '¡Muy Alto! 📈' : '¡Muy Bajo! 📉';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      //Si ya no te quedan vidas
      document.querySelector('.message').textContent = '💥 ¡Has Perdido! 💥';
      document.querySelector('.score').textContent = 0;
    }
  }
});
//Damos funcionalidad al boton Again
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.message').textContent = 'Start guessing...';

  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
});
