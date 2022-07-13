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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// -------------------------------------------------- THE FINDINDEX METHOD
console.log('------------ THE FINDINDEX METHOD ------------');

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
