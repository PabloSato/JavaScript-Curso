'use strict';
//ABRIMOS TERMINAL Y PONEMOS live-server para lanzar el node live server
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
