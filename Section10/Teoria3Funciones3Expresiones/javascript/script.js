'use strict';
//ABRIMOS TERMINAL Y PONEMOS live-server para lanzar el node live server
//los emojis se ponen con cmd+ctrl+space

//LLAMAR DE FORMA INMEDIATA A FUNCIONES
/*
hay veces en JS que necesitamos usar una función que será usada una única vez. No se volverá a usar otra vez en todo el proyecto.
Un afunción que desaparezca una vez usada. La forma de hacerlo es engañando a JS, crear una función sin nombre, envuelta en paréntesis y 
realizar su llamada "(funcion(){})();"



*/

(function () {
  console.log('Esta funcion desaparecerá ahora!');
})();

//También lo podemos usar con funciones flecha
(() => console.log('Esta funcion TAMBIÉN desaparecerá ahora!'))();

//----------------------  CAMBIAMOS DE TEMAAAAAA
console.log('---------- CLOSURE ------------');

const secureBooking = function () {
  let passngerCount = 0;

  return function () {
    passngerCount++;
    console.log(`${passngerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

console.log('---------- MORE AND MORE CLOSURE ------------');

//Ejemplo 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g(); //al llamar a g() damos valor a la variable a
f(); //al llamar a f multiplicamos por 2 la variable a y lo pintamos por consola. Si lo hacemos al revés no pintaría nada, ya que f no tendría valor
//Cambiamos el valor de f al llamar a la funcion h(), que la redefine
h();
f();
console.dir(f);

//Ejemplo 2
const boardPassenger = function (n, wait) {
  //pasamo el número de pasajeros y el tiempo de espera
  const perGroup = n / 3; // son 3 grupos

  setTimeout(function () {
    console.log(`We are noew boarding all ${n} passangers`);
    console.log(`There are 3 groups, each with ${perGroup} passangers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

// const perGroup = 1000;
boardPassenger(180, 3);
