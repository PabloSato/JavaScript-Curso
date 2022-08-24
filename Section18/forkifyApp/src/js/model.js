import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

//Función que cambia el state del objeto
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data; // Como destructuramos esto sería igual que tener => let recipe = data.data.recipe

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    //Temp error handler
    console.error(`${err}!!`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    //Temp error handler
    console.error(`${err}!!`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; //0; => cogemos la pagina que nos llega, le restamos uno y la multiplicamos por la cantidad de resultdos que queremos que aparezcan
  const end = page * state.search.resultsPerPage; //9; => cogemos la pagina y la multiplicamos por la cantidad de resultados que queremos que nos devuelva

  // start = 0; => 1 - 1 = 0, 0 * 10 = 0
  //end = 10; 1 * 10 = 10 // nos daría del 0 al 10 resultado

  return state.search.results.slice(start, end);
};
