'use strict';
//ABRIMOS TERMINAL Y PONEMOS live-server para lanzar el node live server
//los emojis se ponen con cmd+ctrl+space

//TEXTO
// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1 . Recommended foods
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2. Sarah's dog y comprobar si come mucho o poco
const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(sarahsDog);
console.log(
  `Sarah's dog is eating too ${
    sarahsDog.curFood > sarahsDog.recFood ? 'much' : 'little'
  }`
);

// 3 . Crear un array con el nombre de todos los dueños cuyos perros comen mucho
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4 . Crear los strings
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

// 5 . Log a la consola el perro que come exactamente lo que debe (TRUE O FALSE)
const exactFood = dogs.some(dog => dog.curFood === dog.recFood);
console.log(exactFood);

// 6 . Log a la consola el perro que come ok (TRUE O FALSE)
const okFood = dogs.some(
  dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
);
console.log(okFood);

// 7 . Crea un array con los perros que comen ok
const checkFood = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

const dogsOk = dogs.filter(checkFood);
console.log(dogsOk);

// 8. Crea una copia del array de perros y ordenalo por la recFood ASC

const dogsCopy = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsCopy);
