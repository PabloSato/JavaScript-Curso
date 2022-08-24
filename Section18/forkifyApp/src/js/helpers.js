import { TIMEOUT_SEC } from './config.js';

//FUNCIONES DE USO VARIADO

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    //Para evitar que se quede en el fetch de forma infinita
    //y nunca devuelva nada. Usamos el método race([]) del Promise
    //Se ejecutará la función que llegue antes, el fetch o el timeout
    //de esta forma controlamos el tiempo que queremos que se quede en la llamada fetch
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    //Con este throw lanzamos el error para que lo recoja el catch del archivo desde donde se llama la función
    //Esto se llama propagar el error
    throw err;
  }
};
