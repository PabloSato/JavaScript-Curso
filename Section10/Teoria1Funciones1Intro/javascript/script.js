'use strict';
//ABRIMOS TERMINAL Y PONEMOS live-server para lanzar el node live server
//los emojis se ponen con cmd+ctrl+space

const bookings = [];

const createBooking = function (
  flightNum,
  numPassenger = 1,
  price = 199 * numPassenger //Si no tiene un precio, por defecto el precio es 199 por el número de pasajeros
) {
  //Así, abajo, se daba un valor por defecto en el ES5, como está es como se hace en el ES6
  //   numPassenger = numPassenger || 1; //Si es undefined, le damos 1 de valor
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassenger,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

//Para dejar sin pasar uno de los parámetros (no el último), lo declaramos undefined
createBooking('LH123', undefined, 300);
createBooking(undefined, undefined, 300);

const flight = 'LH234';
const pablo = {
  name: 'Pablo Fenrádnez',
  passport: 123456789,
};

const checkIn = function (flightNum, passanger) {
  flightNum = 'LH999';
  passanger.name = 'Mr. ' + passanger.name;

  if (passanger.passport === 123456789) {
    // alert('Check In');
  } else {
    // alert('Wrong Passport!');
  }
};

// checkIn(flight, pablo);
// console.log(flight);
// console.log(pablo);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000);
};
newPassport(pablo);
checkIn(flight, pablo);

//Pasar por valor y Pasar por referencia. JS NO PASA POR REFERENCIA, nunca

//---------------------------------------------------------------------FUNCIONES
