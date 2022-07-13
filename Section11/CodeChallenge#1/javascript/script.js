'use strict';
//ABRIMOS TERMINAL Y PONEMOS live-server para lanzar el node live server
//los emojis se ponen con cmd+ctrl+space

const checksDogs = function (dogsJulia, dogsKate) {
  const correctJulia = dogsJulia.slice(1, -2);

  const allData = correctJulia.concat(dogsKate);
  console.log(allData);

  allData.forEach(function (ele, i) {
    if (ele >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${ele} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
  });
};

checksDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checksDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
