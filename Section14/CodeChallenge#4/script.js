'use strict';

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`The speed is ${this.speed} km/h`);
  }

  break() {
    this.speed -= 5;
    console.log(`The speed is now ${this.speed} km/h`);
    return this;
  }
}

class EvCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
    );
    return this;
  }
}

const rivian = new EvCl('Rivian', 120, 23);
console.log(rivian);
rivian.accelerate().chargeBattery(2).break().accelerate();
console.log(rivian);
