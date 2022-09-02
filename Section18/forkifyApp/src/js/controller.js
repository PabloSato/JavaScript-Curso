import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

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

    //2 .- Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    // 3 .- Update Bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 4 .- Loading Recipe
    await model.loadRecipe(id); // => async. No devuelve nada, por eso no la guardamos

    // 5 .- Rendering Recipe
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

const controlServings = function (newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings);
  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //Si NO está marcado, lo marcamos
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  //Actualizamos la receta para que se vea marcada
  recipeView.update(model.state.recipe);
  //Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = function (newRecipe) {
  console.log(newRecipe);

  // Upload the new Recipe data
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init(); //=> esta es la llamada de la función que s eejcuta al inicio del todo
