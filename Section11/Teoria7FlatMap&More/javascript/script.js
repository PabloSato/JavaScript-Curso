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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  //Si SORT es TRUE, realizamos una copia del array y lo ordenamos (ASC)
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;
const movementsUsd = movements.map(function (mov) {
  return mov * euroToUsd;
});
const movementsUsdArrow = movements.map(mov => mov * euroToUsd);
const movDescript = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdraw'} ${Math.abs(
      mov
    )}`
);

const user = 'Steven Thomas Williams';
const username = user
  .toLowerCase() //Ponemos todo en minusculas (steven thomas williams)
  .split(' ') //Creamos un array apartir del caracter de espacio ('steven','thomas','williams')
  .map(ele => ele[0]) //Al ser un array, lo recorremos en un map quedandonos con la primera letra de cada elemento('s','t','w')
  .join(''); //Unimos en un string lo que queda del array (stw)

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

const deposits = movements.filter(mov => mov > 0);

const withdrawals = movements.filter(mov => mov < 0);
const balance = movements.reduce((acc, ele, i, arr) => acc + ele, 0); // => Este 0 es el vaor inicial del acumulador

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, ele) => acc + ele, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcMax = movements.reduce(
  (acc, ele) => (acc > ele ? acc : ele),
  movements[0] //El valor inicial será el primer valor del array
);
//--------------------------------------------------- CHAINING METHODS

const totalUsd = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(outcomes)}€`;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// -------------------------------------------------- THE FIND METHOD
//El método find() no devuelve un array, solo devueve el primer elemento del array que cumpla la condición
const firstWithDrawal = movements.find(mov => mov < 0);

const account = accounts.find(accou => accou.owner === 'Jessica Davis');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// -------------------------------------------------- THE LOGIN

//Funcion de display de valores
const updateUI = function (acc) {
  // acc corresponde a currentAccount

  //Display movimientos
  displayMovements(acc.movements);
  //Display balance
  calcDisplayBalance(acc);
  //Display sumatorio
  calcDisplaySummary(acc);
};

//EventListener

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //Previene del submit
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  //Esto es lo mismo que poner if(currentAccount && currentAccount.pin == etc)
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI un mensaje de bienvenida
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Vaciar los inputs del login
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

    // //Display movimientos
    // displayMovements(currentAccount.movements);
    // //Display balance
    // calcDisplayBalance(currentAccount);
    // //Display sumatorio
    // calcDisplaySummary(currentAccount);
    // console.log('LOGIN');

    //Display movimientos, balance y sumatorio
    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// -------------------------------------------------- THE TRANSFER

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 && //Comprobamos que la transferencia sea superior a 0 (positiva)
    receiverAcc && // Comprobamos que la cuenta que reciba exista ( es = a receiverAcc == true)
    currentAccount.balance >= amount && // Comprobamos que la cuenta que emite tenga como minimo la misma cantidad que emite
    receiverAcc.username !== currentAccount.username //Comprobamos que no nos estamos mandando dinero a nosotros mismos
  ) {
    //Hacemos la transferencia
    currentAccount.movements.push(-amount); //Le restamos el dinero a la cuenta que emite la transferencia (la nuestra)
    receiverAcc.movements.push(amount); //Le añadimos el dinero a la cuenta que recibe la transferencia

    //Actualizamos la UI con la nueva informacion
    updateUI(currentAccount);
  }
});

//console.log('------------ THE SOME METHOD ------------');

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add movement
    currentAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// -------------------------------------------------- THE FINDINDEX METHOD
//console.log('------------ THE FINDINDEX METHOD ------------');

//Sirve para obtener el indice de un elemento dentro de un array

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    //Borramos la Cuenta
    accounts.splice(index, 1);

    //Escondemos la UI
    containerApp.style.opacity = 0;
  }
  //Limpiamos los inputs
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// -------------------------------------------------- THE SOME METHOD
// console.log(movements);
// console.log('------------ THE SOME METHOD ------------');
// //Devuelve TRUE si encuentra alguna coincidencia a una CONDICIÓN
// //Si queremos saber, por ejemplo, si hay algun movimiento sobre 0 en este array usamos el método some()
// const anyDeposits = movements.some(mov => mov > 0); // Nos devuelve TRUE o FALSE
// console.log(anyDeposits);
// console.log('------------ THE INCLUDES METHOD ------------');
// //Devuelve TRUE si encuentra alguna coincidencia exacta
// const include = movements.includes(-130);
// console.log(include);
// console.log('------------ THE EVERY METHOD ------------');
// console.log('------------ THE EVERY METHOD ------------');
//Solo devuelve TRUE si TODOS los elementos del Array cumplen la condición que le pasamos
// console.log(movements.every(mov => mov > 0)); //Devuelve FALSE
// console.log(account4.movements.every(mov => mov > 0)); //Devuelve TRUE (esta cuenta solo tiene ingresos, asique todos los movimientos cumplen la condición)

//Separate Callback

// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// console.log('------------ THE FLAT METHOD ------------');
// // El método flat borra los arrays anidados y los "une" al array padre
// // Por defecto solo baja un primer nivel (flat(1)), pero le podemos pasar por parámetros hasta dónde queremos que baje
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements); //De esta forma podemos crear un array con los valores de otros arrays anidados
// //console.log(accountMovements); // Un array de arrays con los movimientos
// const allMovements = accountMovements.flat(); //Ahora tenemos en un único array todos los valores juntos

// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0); // Aplicando reduce conseguimos la suma de todos los valores
// console.log(overalBalance); // 17840
// //Vamos a unir todos los pasos anteriores en uno solo
// const overalBalance2 = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance2); // 17840

// // console.log('------------ THE FLATMAP METHOD ------------');
// // Combina los dos métodos (flat() y map()) en uno solo
// // Mejor para la performance
// // flatMap() solo puede bajar 1 nivel de profundidad, si necesitas bajar más hay que usar el flat()

// const overalBalance3 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance3); // 17840
// console.log('--------- SORTING ARRAYS ----------');
// // Array Strings
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners);
// console.log(owners.sort()); //Ordena el array alfabéticamente por defecto (lo muta!!, modifica las posiciones)
// console.log(owners);

// //Numbers
// console.log(movements);
// //console.log(movements.sort()); // No lo ordena, lo convierte en Strings y lo ordena como si fueran Strings
// // Para ordena de manera ASCENDENTE el array se hace asi
// // a => currentValue
// // b => nextValue
// // Si devuelve < 0, lo ordena A, B
// // Si devuelve > 0, lo ordena B, A
// movements.sort((a, b) => {
//   if (a > b) return 1;

//   if (b > a) return -1;
// });
// console.log(movements); // ASC
// // Ordenamos de manera DESCENDENTE
// movements.sort((a, b) => {
//   if (a < b) return 1;
//   if (a > b) return -1;
// });
// console.log(movements); // DESC

// // Una forma MÁS SIMPLE
// movements.sort((a, b) => a - b);
// console.log(movements); // ASC
// movements.sort((a, b) => b - a);
// console.log(movements); // DESC
