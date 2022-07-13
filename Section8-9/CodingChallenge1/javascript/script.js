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
//1º Crear un array de jugadores para cada equipo
const [players1, players2] = game.players;
//2º Crear una variable para el portero y un array para el resto de jugadores
const [gk1, ...fieldPlayers1] = players1;
const [gk2, ...fieldPlayers2] = players2;
//3º crear un array con todos los jugadores de los dos equipos
const allPlayers = [...players1, ...players2];
//4º Crear un array con todos los jugadores del Bayern, más los 3 cambios 'Thiago', 'Couthino' y 'Perisic'
const players1Final = [...players1, 'Thiago', 'Couthino', 'Perisic'];
//5º Crear una variable por cada odds
const {
  odds: { team1, x: draw, team2 },
} = game;
//6º crear una variable que le pasas nombres y devuevle goles o algo asi
const printGoals = function (...players) {
  console.log(`${players.length} goals were scored`);
  for (let i = 0; i < players.length; i++) {
    console.log(`${players[i]} ha marcado el ${i + 1} gol`);
  }
};
printGoals(...game.scored);
//7º Que equipo tiene mayor posibilidad de ganar
team1 < team2 && console.log('Team1 tiene mayor posibilidad de ganar');
