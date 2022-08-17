'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

// --------- GEOLOCATION API --------------
// Leaflet => https://leafletjs.com/index.html
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      console.log(`https://www.google.es/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude]; // Siempre va primero latitude

      map = L.map('map').setView(coords, 13); // hay que pasar el array con las coordenadas (primero latitud) y el otro parámetro es el valor del zoom

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //Añadimos un eventListener al map, con sus funciones propias
      map.on('click', function (mapE) {
        mapEvent = mapE;
        // 1 - Mostramos el formulario y hacemos foco en él
        form.classList.remove('hidden');
        inputDistance.focus();
        //
      });
    },
    function () {
      alert('Could not get your position!');
    }
  );
}

form.addEventListener('submit', function (e) {
  e.preventDefault(); // Para que no recargue la pagina

  // ----- CLEAR INPUT FIELDS
  inputDistance.value =
    inputCadence.value =
    inputDuration.value =
    inputElevation.value =
      '';
  // ------- DISPLAY MARKERS ---------
  //Obtenemos lat y lng del ratón en el mapa
  const { lat, lng } = mapEvent.latlng;
  // Añadimos markers al mapa customizados
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('This Works!!')
    .openPopup();
});

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
