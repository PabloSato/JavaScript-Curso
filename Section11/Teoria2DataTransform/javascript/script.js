'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

///////////////////////////////////////////////// DATA TRANSFORM

/////////////////////////////////////////////////MAP METHOD

console.log('*_*_*_**_*_*_*_*_*_*_ MAP METHOD *_*_*__*_*_*_*_*_*_*_*_');

//Convertimos estos valores (euros) a dolares
console.log('------------ CONVERSION EURO-DOLLAR ----------');
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;
const movementsUsd = movements.map(function (mov) {
  return mov * euroToUsd;
});

console.log(movements);
console.log(movementsUsd);

//Lo hacemos con una ARROW FUNCTION
const movementsUsdArrow = movements.map(mov => mov * euroToUsd);
console.log(movementsUsdArrow);
console.log('--------------- ARRAY DE MOVIMIENTOS -------------');
const movDescript = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdraw'} ${Math.abs(
      mov
    )}`
);
console.log(movDescript);

console.log('----------- CREAMOS USERNAME---------------');
const user = 'Steven Thomas Williams';
//POR PARTES:
//Queremos las iniciales en minusculas del nombre para que sean el username
const username = user
  .toLowerCase() //Ponemos todo en minusculas (steven thomas williams)
  .split(' ') //Creamos un array apartir del caracter de espacio ('steven','thomas','williams')
  .map(ele => ele[0]) //Al ser un array, lo recorremos en un map quedandonos con la primera letra de cada elemento('s','t','w')
  .join(''); //Unimos en un string lo que queda del array (stw)
console.log(username);

//Creamos una función para aplicar la lógica anterior a todos los nombres de las cuentas

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
console.log(accounts);

///////////////////////////////////////////////// DATA TRANSFORM

/////////////////////////////////////////////////FILTER METHOD
console.log('*_*_*_**_*_*_*_*_*_*_ FILTER METHOD *_*_*__*_*_*_*_*_*_*_*_');
console.log('------ CREAMOS ARRAY DE DEPÓSITOS EN LA CUENTA');

const deposits = movements.filter(mov => mov > 0);
console.log(deposits);

console.log('------ CREAMOS ARRAY DE RETIRADAS EN LA CUENTA');

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

///////////////////////////////////////////////// DATA TRANSFORM

/////////////////////////////////////////////////REDUCE METHOD
console.log('*_*_*_**_*_*_*_*_*_*_ REDUCE METHOD *_*_*__*_*_*_*_*_*_*_*_');
//reduce(function(acumulador, valor, indice, array))----> OJITO!! un parámetro nuevo en este método
console.log(movements);
const balance = movements.reduce((acc, ele, i, arr) => acc + ele, 0); // => Este 0 es el vaor inicial del acumulador

console.log(balance);

///////////////////////////////////////////////// PINTAMOS DATA EN EL HTML
console.log(
  '*_*_*_**_*_*_*_*_*_*_ DISPLAY CURRENT BALANCE *_*_*__*_*_*_*_*_*_*_*_'
);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, ele) => acc + ele, 0);
  labelBalance.textContent = `${balance} EUR`;
};
calcDisplayBalance(account1.movements); //Pintamos el balance de la cuenta 1 en el current balance del HTML

//Optener el Máximo valor del balance usando reduce();
console.log('*_*_*_**_*_*_*_*_*_*_ REDUCE METHOD 2 *_*_*__*_*_*_*_*_*_*_*_');
console.log(movements);
const calcMax = movements.reduce(
  (acc, ele) => (acc > ele ? acc : ele),
  movements[0] //El valor inicial será el primer valor del array
);
console.log(`Max Value: ${calcMax}`);
