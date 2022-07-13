'use strict';
//ABRIMOS TERMINAL Y PONEMOS live-server para lanzar el node live server
//los emojis se ponen con cmd+ctrl+space

const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAges);
  const min18 = humanAges.filter(age => age >= 18);
  console.log(min18);
  const average = min18.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  console.log(average);
  console.log('----- NEXT ------');
};

calcAverageHumanAge(data1);
calcAverageHumanAge(data2);
