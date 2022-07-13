'use strict';
//ABRIMOS TERMINAL Y PONEMOS live-server para lanzar el node live server
'use strict';
//ABRIMOS TERMINAL Y PONEMOS live-server para lanzar el node live server
/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmundo',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Gorretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lwandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//1º Recorre el array de goles y pinta en pantalla el goleador con el numero del gol
for (let i = 0; i < game.scored.length; i++) {
  console.log(`Goal ${i + 1}: ${game.scored[i]}`);
}
//2º Calcula la media de los odd y pintala
let media = 0;
let suma = 0;
for (const x of Object.values(game.odds)) {
  media += x;
  suma++;
}
console.log(
  `El total de odds es ${media} y la Media de los odds es ${media / suma}`
);

//3º Pintar los odds pero bonitas
const entries = Object.entries(game.odds);
for (const [team, odd] of entries) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}

//4º Crear un objeto que se llame scores que contenga el nombre de los goleadores y el
//numero de goles (Gnarby 1, Hummels 1 y Lewandowski 2)

const scores = {};
for (const player of game.scored) {
  scores[player] ? scores[player]++ : (scores[player] = 1);
}
console.log(scores);
*/
const gameEvents = new Map([
  [17, 'GOAL'],
  [36, 'Sustitución'],
  [47, 'GOAL'],
  [61, 'Sustitución'],
  [64, 'Tarjeta Amarilla'],
  [69, 'Tarjeta Roja'],
  [70, 'Sustitución'],
  [72, 'Sustitución'],
  [76, 'GOAL'],
  [80, 'GOAL'],
  [92, 'Tarjeta Amarilla'],
]);
//1º Crear un array de 'eventos' sin duplicados
const arrayEventos = new Array(...gameEvents.values());
const events = new Set(arrayEventos);
console.log(events);
//LA FORMA CORRECTA SERÏA
const correctaEvents = [...new Set(gameEvents.values())]; //ES UN ARRAY NO UN SET, pero no tiene duplicados
console.log(correctaEvents);
//2º Eliminar la tarjeta Amarilla del minuto 64 del mapa
console.log(gameEvents);
gameEvents.delete(64);
console.log(gameEvents);
//3º Pintar el siguiente String "Un evento pasó cada 9 minutos de media"
const time = [...gameEvents.keys()].pop();
console.log(time);
console.log(`Un evento pasó, de media, cada ${time / gameEvents.size} minutos`);
//4º Loop los eventos y pintarlos en pantalla marcando si son en la 1º parte o en la 2º

for (const [key, value] of gameEvents) {
  if (key < 45) {
    console.log(`[FIRST HALF] ${key}: ${value}`);
  } else {
    console.log(`[SECOND HALF] ${key}: ${value}`);
  }
}
