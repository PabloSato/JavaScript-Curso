'use strict';

// ES EL CODE CHALLENGE 1 PERO EN CLASES OJITOO

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    return this.speed * 1.6;
  }
}

const myCar = new CarCl('Ford', 120);
console.log(myCar.speedUS);
myCar.accelerate();
myCar.brake();
myCar.speedUS = 50;
console.log(myCar);
