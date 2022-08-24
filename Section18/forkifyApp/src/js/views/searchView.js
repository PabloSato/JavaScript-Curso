class SearchView {
  _parentEl = document.querySelector('.search');

  /**Método que nos devuelve el value del input del elemento search */
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  /**Método que nos limpia el campo imput del elemento Search */
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  //Publisher del evento search
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault(); // => evitamos que la pagina se recargue
      handler();
    });
  }
}

export default new SearchView();
