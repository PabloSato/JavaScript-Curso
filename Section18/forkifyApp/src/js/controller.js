import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable'; // Polifying everything else
import 'regenerator-runtime/runtime'; // Polifying async/await

// if (module.hot) {
//   module.hot.accept(); // => esto viene de parcel
// }

const recipeContainer = document.querySelector('.recipe');

//API de BBDD con recetas
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // 1 .- Obtenemos el id de la receta
    const id = window.location.hash.slice(1); // => extraemos el hash del location(que es la url). Con slice(1) le quitamos el #

    if (!id) return;

    recipeView.renderSpinner();

    // 2 .- Loading Recipe
    await model.loadRecipe(id); // => async. No devuelve nada, por eso no la guardamos

    // 3 .- Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1 .- Obtenemos la Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2 .- Cargamos los resultados de la búsqueda
    await model.loadSearchResults(query);

    // 3 .- Renderizamos los resultados
    resultsView.render(model.getSearchResultsPage());

    // 4 .- Renderizamos la paginación inicial
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1 .- Renderizamos los NUEVOS resultados
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2 .- Renderizamos la paginación ACTUAL
  paginationView.render(model.state.search);
};

//LLAMADAS DEL MÉTODO controlRecipes
//haschange => Cuando pulsamos en los enlaces de la izq, cambia el hash (codigo #:id)
//por cada cambio llamamos al método controlRecipes que renderiza la Receta
//load => Llamamos al método controlRecipes cuando se carga la pagina
// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipes)
// );// => NOS LO LLEVAMOS AL VIEW

//Esto es lo mismo que lo anterior
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init(); //=> esta es la llamada de la función que s eejcuta al inicio del todo
