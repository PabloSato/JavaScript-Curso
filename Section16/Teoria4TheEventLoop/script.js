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

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    //ESto es lo mismo que lo anterior
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      // const { latitude, longitude } = pos.coords;
      //Damos nuevos nombres a las variables que destructuramos
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      // console.log(res);
      if (!res.ok) throw new Error(`Problem with geocoding - ${res.status}`);
      return res.json();
    })
    .then(data => {
      // console.log(data);
      console.log(`Your are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found - ${response.status}`);

      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message}!!!`));
};

btn.addEventListener('click', whereAmI);
