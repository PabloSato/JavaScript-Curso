'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const h1 = document.querySelector('h1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('nav');
///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// IMPLEMENTANDO SMOOTH SCROLL

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  // MODERN WAY
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page Navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Match strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tab Gallery

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // No importa si pinchas en él mismo o en el span que contiene, siempre elige el boton
  //Ignoramos cualquier click que no sea en los botones
  if (!clicked) return;

  //Quitamos a todos los tabs la clase active
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  //Borramos la clase activa a todos los contenidos
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Añadimos al tab que hemos pinchado la clase active
  clicked.classList.add('operations__tab--active');
  //Activamos el area del contenido
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// MENU FADE ANIMATION
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// Pasamos "argumentos" a un handler usando bind(argumento) con la función
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation

// TODO ESTO ES UNA MIERDA ---
//Determinamos la posición del inicio de la section1
const initialCords = section1.getBoundingClientRect();
//Una vez que llegamos a esas coordenadas, add sticky class
// window.addEventListener('scroll', function (e) {
//   if (this.window.scrollY > initialCords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
// SE HACE ASI JODER ---

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries; // =>deconstruimos el array de entries, es lo mismo que poner const entry = entries[0]

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, // Cuando no se vea nada del header, que salte el sticky
  rootMargin: `-${navHeight}px`, // Queremos que lance el sticky elTamañodelHeader antes de que termine de desaparecer el header
});
headerObserver.observe(header);

//Reveal Sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  // Si la seccion no está siendo intersecting, salimos
  if (!entry.isIntersecting) return;

  //Quitamos la clase de hidden
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObersever = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, // => 15%
});

allSections.forEach(function (section) {
  sectionObersever.observe(section);
  section.classList.add('section--hidden');
});
// ----------- LAZY LOADING IMAGES ------------

//Las Imagenes son las que más impacto negativo tienen
//a la hora del performance de una pagina, al cargarse
//Por eso usamos la estrategia Lazy Loading Images
//(Las imagenes no se cargaran del todo hasta que no estén a la vista)
//Para ello tenemos imagenes muy pequeñas y de peor resolucion posible
//y a medida que vamos haciendo scroll, esas imagenes de baja resolución
//son sustituidas por las imagenes (ya requetelahostia) que tienen referenciadas
//en su atributo de data-src (HTML)
//Para evitar el primer impacto, le añadimos un filtro blur a la imagen pequeña
// en CSS que luego es quitado

//Seleccionamos las imagenes
const imgTargets = document.querySelectorAll('img[data-src'); // => Seleccionamos todas las imagenes que tienen el atributo data-src, el resto de imagenes NO SON seleccionadas

//Callback function
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //Replace src con data-src
  entry.target.src = entry.target.dataset.src; // => dataset es donde se guardan todos los atributos data-

  //Para quitar el filtro blur es un poco raruno
  //Tenemos que esperar que termine de cargarse la nueva imagen
  //por eso usamos el eventListener al load
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  // Dejamos de observar las imagenes
  observer.unobserve(entry.target);
};

//Observer
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

//Recorremos las imagenes seleccionadas para aplicarlas el observer a cada una
imgTargets.forEach(img => imgObserver.observe(img));
