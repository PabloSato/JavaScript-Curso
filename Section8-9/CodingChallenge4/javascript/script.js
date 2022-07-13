'use strict';
//ABRIMOS TERMINAL Y PONEMOS live-server para lanzar el node live server
//los emojis se ponen con cmd+ctrl+space

console.log('-------------------- CODING CHALLENGE 4 --------------');

//Escribir un programa que recibe una lista de variables escrita en underscore_case y los convertimos en camelCase
//El input venrá de un textarea del DOM, y la conversión ocurrirá cuando el botón sea pulsado

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  console.log(rows);

  for (const [key, value] of rows.entries()) {
    const [first, second] = value.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(key + 1)}`);
  }
});
