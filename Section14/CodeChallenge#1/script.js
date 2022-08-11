'use strict';
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed = this.speed + 10;
  console.log(this.speed);
};

Car.prototype.break = function () {
  this.speed = this.speed - 5;
  console.log(this.speed);
};

const myCar = new Car('BMW', 120);
const yourCar = new Car('Mercedes', 95);

myCar.accelerate();
yourCar.break();

myCar.break();
yourCar.accelerate();
