'use strict';

// --------- GEOLOCATION API --------------
// Leaflet => https://leafletjs.com/index.html

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// -------------- HTML NODO ---------------
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// ------------ CLASES ----------------
// ------------------------ Class Workout
class Workout {
  id = (Date.now() + '').slice(-10); // una chapuza para crear un id 'unico'
  date = new Date();

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat , lng]
    this.distance = distance; // in km
    this.duration = duration; // in minutes
  }
}
// ------------------------ Class Running
class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    // min / km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
// ------------------------ Class Cycling
class Cycling extends Workout {
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calcSpeed();
  }
  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 170);
// const cycl1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycl1);

// ----------------------- Class App -----
class App {
  //PROPIEDADES PRIVADAS DE LA CLASE
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
  }

  // - MÉTODOS -
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // bind() => usamos bind para pasar el this al método que llamamos (loadMap)
        function () {
          alert('Could not get your position!');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    console.log(`https://www.google.es/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude]; // Siempre va primero latitude

    this.#map = L.map('map').setView(coords, 13); // hay que pasar el array con las coordenadas (primero latitud) y el otro parámetro es el valor del zoom

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //Añadimos un eventListener al map, con sus funciones propias
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    // 1 - Mostramos el formulario y hacemos foco en él
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault(); // Para que no recargue la pagina
    // ----- CLEAR INPUT FIELDS
    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        '';
    // ------- DISPLAY MARKERS ---------
    //Obtenemos lat y lng del ratón en el mapa
    const { lat, lng } = this.#mapEvent.latlng;
    // Añadimos markers al mapa customizados
    L.marker([lat, lng])
      .addTo(this.#map)
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
  }
}
// ------ IMPLEMENTACIÓN DE LAS CLASES --------
const app = new App();
