// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2

//Parent class
export default class View {
  _data;

  /**Método que renderiza el componente html con los datos  */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  /**Método que actualiza solo la parte que queremos del DOM */
  update(data) {
    this._data = data;
    //Creamos un nuevo markup para comparar con el que tenemos en la web
    const newMarkup = this._generateMarkup();
    //Para poder compararlo, lo tenemos que transformar primero en un objeto DOM
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    //Guardamos en Arrays tanto el nuevo objeto DOM, como el que ya tenemos desplegado
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    //Comparamos los dos arrays para buscar las diferencias
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //Si son distintos los nodos AND contienen texto
      //Cambiamos el texto
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      //Update los atributos
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  /**Método que limpia un componente html */
  _clear() {
    this._parentElement.innerHTML = '';
  }
  /**Método que renderiza un Spinner en el DOM */
  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  //**Método para el handler de errores en el DOM */
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> 
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**Método que sirve para renderizar mensajes en el DOM */
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> 
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
