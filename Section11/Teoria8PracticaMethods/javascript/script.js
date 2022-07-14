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

labelBalance.addEventListener('click', function () {
  //querySelectorAll => NO ES UN ARRAY, es una NodeList() con forma de array
  //Convertimos en un array el querySelector y le aplicamos como segundo argumento del from la función callback
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    ele => Number(ele.textContent.replace('€', ''))
  );
  console.log(movementsUI);
  //Esta forma también convierte en array (mediante la deconstrucción)
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});

// -------------------------------------------------- PRACTICA METHODS

// 1. Cuánto dinero hay depositado en TOTAL en el banco (sumando el de todas las cuentas)

// A - Usaremos el método map() ya que queremos crear un nuevo array a partir del array de accounts
//      En ese nuevo array guardaremos los movimientos (que a su vez son arrays) de todas las cuentas (accounts.movements)
// B - Para sacar los valores de esos arrays anidados y unirlos en el array padre, usaremos el método flat()
const bankDepositSum0 = accounts.map(acc => acc.movements).flat();
// C - Para simplificar el código, combinaremos A y B usando el método flatMap()
// D - Como queremos sólo los valores positivos, usaremos el método filter() para filtrar el array
// E - Para quedarnos con la suma total de todos los elementos que tenemos ahora en el arry usaremos el método reduce()
//     Pasamos 2 valores a la funcion
//      - sum : previousValue
//      - cur: currentValue
//       El 0 indica el valor inicial
const bankDepositSum1 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0); //La suma total es 25180;

console.log(bankDepositSum1);

// 2. Cuántos depósitos hay en el banco con al menos $1.000

// --- Primera Forma de Hacerlo ---
// A - Usamos el método faltMap() para unir todos los movimientos en el mismo array
// B - Filtramos (filter()) el array para quedarnos con todos los movimientos >= a 1000
// C - Al querer solo la cantidad de depósitos, usamos length
const numDeposits1000a = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;

// --- Segunda Forma de Hacerlo ---
// A - En este método usaremos el reduce() para que nos devuelva el acumulador
const numDeposits1000b = accounts
  .flatMap(acc => acc.movements)
  .reduce((sum, cur) => (cur >= 1000 ? ++sum : sum), 0);

console.log(numDeposits1000b); // La cantidad de depósitos es 6;

// 3. Crear un objeto que contenga la suma de los depósitos y la suma de las retiradas

// A - En este caso el valor inicial no es 0, sino el objeto dónde vamos a guardar los sumatorios
//      En este caso "sum" es lo mismo que el valor inicial, es decir, sum es igual al objeto
//      Si el currentValue es mayor que cero lo sumas a depositos, sino (si es menor que cero) lo sumas a retiradas
// B - Con reduce() se debe devolver siempre el valor, si no tiene {} (cuerpo de función) el método lo devuelve por defecto
//      Pero en este caso si que tiene body, por lo que tenemos que devolver explicitamente
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sum, cur) => {
      cur > 0 ? (sum.deposits += cur) : (sum.withdrawals += cur);
      return sum;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sums); // {deposits: 25180, withdrawals: -7340}

// C - También podemos deconstruir el objeto y que nos devuelva dos variables con los datos
const { deposits1, withdrawals1 } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sum, cur) => {
      // cur > 0 ? (sum.deposits1 += cur) : (sum.withdrawals1 += cur);
      //Hay una forma más mimim de hacer esto mismo que es:
      sum[cur > 0 ? 'deposits1' : 'withdrawals1'] += cur;
      return sum;
    },
    { deposits1: 0, withdrawals1: 0 }
  );
console.log(deposits1); // 25180
console.log(withdrawals1); // -7340

// 4. Convertir cualquier String a Title Case (this is a nice title => This Is a Nice Title)

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  // A - Primero convertimos todo a lowerCase
  // B - Separamos el string por palabras para trabajar con cada individualmente
  // C - Comprobamos si la palabra está en el array de excepciones, si lo está no la tratamos
  // D - Creamos un nuevo array con map() y capitalizamos la primera letra de cada palabra que no esté en exceptions
  //(Necesitamos crear un nuevo array porque no podemos modificar el String?)
  // E - Unimos todas las palabras en una oración
  // D - Capitalizamos toda la oración para asegurarnos que la primera palabra tiene su primera letra en mayúscula, sea cual sea la palabra
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title')); // This Is a Nice Title
console.log(convertTitleCase('this is a LONG title but not too long')); // This Is a Long Title but Not Too Long
console.log(convertTitleCase('and here is another title with an EXAMPLE')); // And Here Is Another Title with an Example
