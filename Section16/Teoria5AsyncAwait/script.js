'use strict';
const URL = 'https://restcountries.com/v2/';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
          <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)}M people</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }</p>
            </div>
          </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
const getJSON = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);

    return response.json();
  });
};
///////////////////////////////////////

// // ----------- XMLHttp RQUEST (OLD SCHOOL) --------
// // ------- getCountry();
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', URL + `/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     renderCountry(data);
//   });
// };

// // Vamos a crear una secuencia de llamadas AJAX,
// // Llamamos primero a un pais (portugal) y cuando se cargue
// // vamos a llamar al pais con el que hace frontera
// //Este segundo pais depende de la primera llamada, por eso va en cascada

// // ----------- getCountryAndNeighbour()
// const getCountryDataAndNeighbour = function (country) {
//   // AJAX Call Country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', URL + `/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     //Render country 1
//     renderCountry(data);

//     // Get Neighbour Country
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     const request2 = new XMLHttpRequest();
//     request2.open('GET', URL + `/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryDataAndNeighbour('usa');
// // getCountryData('portugal');
// // getCountryData('spain');
// // getCountryData('usa');

// // Ahora tenemos callback dentro de callback y esto nos lleva a
// // Callback Hell => y esta mierda hay que evitarla

///////////////////////////////////////
// --------------- PROMISES --------------
// Promises => Un contenedor para un valor futuro (que vienen asincronamente)
// Al usar Promises ya no dependemos de estar usando eventListener y callbacks en funciones asyncronas
// Podemos encadenar promesas una a otra y de esta forma evitamos
// los Callback Hell ( son ES6 )
// Las Promises tienen distintos estados:
// - Al crearse tienen el estado de Pending (todavia no tienen valor)
// - Settled cuando se ha terminado la llamada asyncrona y puede estar
//      - FulFilled (completada)
//      - Rejected (rechazada)
// Podemos manejar los distintos estados de la Promises

// const request = fetch(URL + recurso); // => Simple request
// console.log(request);

// const getCountryData = function (country) {
//   // Recursos
//   const recuName = `name/${country}`;
//   const recuAlpha = `alpha/`;
//   //Promises
//   //Country1
//   fetch(URL + recuName)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders;
//       if (!neighbour) return;
//       //Country2
//       return fetch(URL + recuAlpha + neighbour);
//     })
//     .then(res => res.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       //Este catch cogerá cualquier error que ocurra en el chain
//       console.error(`${err}!!`);
//       renderError(`Something went wrong!! => ${err.message}`);
//     })
//     .finally(() => {
//       //Da igual si la promesa es fulfill o rejected, esta función se ejecuta siempre
//       countriesContainer.style.opacity = 1;
//     });
// };
// const getCountryData = function (country) {
//   // Recursos
//   //Country1
//   getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       console.log(data);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) throw new Error('No neighbour found');

//       return getJSON(
//         `https://restcountries.eu/v2/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       renderError(`Something went wrong!! - ${err.message}. Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// //Click on boton
// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });
// getCountryData('kajja');

///////////////////////////////////////
// // ----------- EVENT LOOP ------------
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 100000; i++) {}
//   console.log(res);
// });

// console.log('Test end');

// ------- BUILDING A PROMISE ---------

// const lottery = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN!!');
//     } else {
//       reject(new Error('You LOOOOSE!'));
//     }
//   }, 2000);
// });

// lottery.then(res => console.log(res)).catch(err => console.error(err));

// // Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 second'));

//////////////////////////////////////

// -------- PROMISIFYING GEOLOCATION ------------

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     //ESto es lo mismo que lo anterior
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// // getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       // const { latitude, longitude } = pos.coords;
//       //Damos nuevos nombres a las variables que destructuramos
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(res => {
//       // console.log(res);
//       if (!res.ok) throw new Error(`Problem with geocoding - ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       // console.log(data);
//       console.log(`Your are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found - ${response.status}`);

//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message}!!!`));
// };

// btn.addEventListener('click', whereAmI);

////////////////////////////////////////////////

// -------- ASYNC / AWAIT -----------

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// const whereAmI = async function () {
//   // await => para la ejecución del codigo hasta que la promesa está fulfill
//   // Parar la ejecución del código en una función async NO es un problema
//   //ya que la función está corriendo en el background, NO bloquea el hilo principal de JS
//   //Eso es lo importante de Async/Await, hace parecer al código sincrónico, mientras
//   // por detrás todo funciona de forma async
//   //Usamos try/catch para atrapar errores en async/await y que no tumbe el código
//   try {
//     //Geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;
//     //Reverse geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     //Creamos errores 404-403 y demás
//     if (!resGeo.ok)
//       throw new Error(`Problem getting location data - ${resGeo.status}`);
//     const dataGeo = await resGeo.json();

//     //Country data
//     const res = await fetch(
//       `https://restcountries.com/v2/name/${dataGeo.country}`
//     );
//     //Creamos errores 404-403 y demás
//     if (!res.ok) throw new Error(`Problem getting country - ${res.status}`);
//     const data = await res.json();
//     renderCountry(data[0]);

//     return `2: You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     renderError(`Something went wrong - ${err.message}`);

//     //Reject promise returned from async funciton
//     //Ahora lo podremos atrapar en el catch() de la llamada de la función
//     throw err;
//   }
// };
// console.log('1: Will get location');
//No pasa nada pero NO ES MUY RECOMENDABLE
// whereAmI()
//   .then(city => console.log(city))
//   .catch(err => console.error(`${err.message} FUCK!!`))
//   .finally(() => console.log('3: Finished getting location')); //Aunque usemos async/await, sigue siendo una promesa, podemos usar el then() para pintar lo que nos devuelve

//Concertimos de una forma async/await completa
//Para ello usamos IIFE
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(city);
//   } catch (err) {
//     console.error(`${err.message} FUCK!!`);
//   }
//   console.log('3: Finished getting location');
// })();

// // ------- RUNNING PROMISES IN PARALLEL --------

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     //Estas llamadas se realizan por defecto de forma secuencial
//     // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

//     //Podemos ahorrar tiempo de carga realizando la llamada de forma paralela
//     //Para ello usamos Promise.all() => recibe un array de promesas y devuelve una
//     //única promesa. Si alguna falla, rechaza todas
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v2/name/${c1}`),
//       getJSON(`https://restcountries.com/v2/name/${c2}`),
//       getJSON(`https://restcountries.com/v2/name/${c3}`),
//     ]);

//     // console.log([data1.capital, data2.capital, data3.capital]);
//     console.log(data);
//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.error(`${err.message}!! FUCK!!`);
//   }
// };

// get3Countries('spain', 'portugal', 'germany');

// ------------ PROMISES COMBINATORS ----------
//Promise.race => la primera función asyncrona que se complete gana la carrera
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/spain`),
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/portugal`),
  ]);
  console.log(res[0]); // la posicion [0] la coge la primera que se completa
})();

//Función para rechazar llamadas que tarden demasiado
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long'));
    }, sec * 1000);
  });
};

//Si el timeout termina antes, toda la llamada será rechazada
Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(0.3),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err.message));

// Promise.allSettled => recibe un array de promesas y devuelve un array de todas las promesas settled (sin importar si son rechazadas o no)
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));

// Promise.any() => Recibe un array de promesas y devuelve la primera que se complete (ignora las rechazadas)
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));
