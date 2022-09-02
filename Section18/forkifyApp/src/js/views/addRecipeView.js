import View from './View';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    //Ejecutamos esta función nada más crear esta vista,
    //no pasa por el controller.
    //Por eso necesitamos el constructor
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  /**
   * Método que quita/pone la clse hidden
   */
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  /**
   * Método que despliega el modal
   */
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this)); // con bind le pasamos el this a la siguiente función (toggleWindow())
  }

  /**
   * Método que cierra el modal
   */
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      //En este caso el form es = a this
      //Lo extendemos a un array para obtener los valores que nos devuelve
      const dataArray = [...new FormData(this)]; //Devuelve un array de Entries
      const data = Object.fromEntries(dataArray); // Convierte el array de Entries en un objeto JS
      handler(data);
    });
  }

  /**Método que genera un componente html de paginacion */
  _generateMarkup() {}
}

export default new AddRecipeView();
