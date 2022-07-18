'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-07-14T14:43:26.374Z',
    '2022-07-16T18:49:59.371Z',
    '2022-07-17T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2022-07-14T14:43:26.374Z',
    '2022-07-16T18:49:59.371Z',
    '2022-07-17T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const formatMovementsDate = function (date) {
  // Usamos Math.abs para obtener el valor absoluto (no numeros negativos)
  // Usamos Math.round para redondear las fechas, no decimales
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24))); // milsec * min * hors * dias

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    //Solo si ha pasado más de una semana devolvemos la fecha
    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // Para pintar las fechas de los movimientos
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDate(date);

    // Pintamos el HTML
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

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

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// ---------------- FAKE ALWAYS LOGGED IN ----------------
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;
// ---------------- /FAKE ALWAYS LOGGED IN ----------------

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // CREATE CURRENT DATE al loguear
    const now = new Date(); // Cogemos el AHORA
    // Damos el formato que queremos a la fecha ( day/month/year)
    // const day = now.getDate();
    // const month = now.getMonth() + 1;
    // estos dos valores nos darían el mes y el día con un único dígito, para obtener dos digitos (poniendo un 0 delante) se haría así
    const day = `${now.getDate()}`.padStart(2, '0'); // 2 digitos y añade 0
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const year = now.getFullYear();
    // Pasa lo mismo con la hora y los minutos
    const hour = `${now.getHours()}`.padStart(2, '0');
    const min = `${now.getMinutes()}`.padStart(2, '0');
    //Con las variables preparadas, pintamos un String bonito
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`; // 18/07/2022, 9:39

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add Transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value); // Redondeamos hacia abajo el valor que pedimos prestado (no damos prestamos con decimales)

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add Loan Date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered'; // las filas pares las pintamos de orangered (0,2,4,6,8,...)

    if (i % 3 === 0) row.style.backgroundColor = 'blue'; // pintamos de azul cada 3 filas (0, 3, 6, 9,...)
  });
});

// --------------------- DATES ---------------------

// 4 Formas de Crear nuevas Date()
// const now = new Date(); // Usamos su constructor
// console.log(now);

// console.log(new Date('Jul 18 2022 09:14:05')); // Usando un String (da el mismo resultado que lo anterior)
// console.log(new Date('December 24, 2022')); // Esto también vale, lo convierte a Date()

// console.log(new Date(account1.movementsDates[0])); // Cogemos el String guardado (son fechas en formateo JS)

// console.log(new Date(2037, 10, 19, 15, 23, 5)); // => Noviembre 19, 2037 a 15h, 23minut, 5 sec ( Noviembre = mes 10, porq está en base 0, Enero es el mes 0)
// console.log(new Date(2037, 10, 31)); // 31 de Nov? JS lo autocorrige, daría Diciembre 01

// //Le podemos pasar milisegundos, 0 sería 1 de Enero de 1970
// console.log(new Date(0)); // 1 de Enero de 1970
// // Tres días después sería
// // 3días (3 * 24h)
// // cada hora está formada por 60 min
// // cada minuto está formada por 60 sec
// // Cada segundo está formado por 1000 milisec
// console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 4 de Enero de 1970

// Working with Dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear()); // Coge solo el año (2037)
// console.log(future.getMonth()); // Coge solo el número del Mes (en base 0, 10 = Noviembre)
// console.log(future.getDay()); // Coge el día de la semana (4 = Jueves)
// console.log(future.getHours()); // 15 horas
// console.log(future.getMinutes()); // 23 minutos
// console.log(future.getSeconds()); // 0 segundos
// console.log(future.toISOString()); // Para convertirlo en ISO y en String (para poder guardarlo por ejemplo)

// // Para conseguir un TimeStamp => Se obtendría en milisegundos pasados desde 1 de Enero de 1970
// console.log(future.getTime()); // 2142253380000 milisegundos

// //Podemos obtener una fecha desde milisegundos
// console.log(new Date(2142253380000)); // Thu Nov 19 2037 15:23:00 GMT+0100 (hora estándar de Europa central)

// // Mejor forma de obtener un TimeStamp
// console.log(Date.now());

// // Setter de Date
// future.setFullYear(2040); // Cambiamos el año
// console.log(future);
// Existe los setter de todos los get anteriores

// ------------ IMPLEMENTANDO DATE EN LA APP -------------
// en login, loan y transfer

// ------- FUNCIONES y MÉTODOS DATE --------

// Días pasados entre dos fechas
const calcDaysPassed = (date1, date2) =>
  Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)); // milsec * min * hors * dias

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1); // 10
