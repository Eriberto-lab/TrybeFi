import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artist: '',
  };

  handleChange = (event) => {
    const { target } = event;

    this.setState(
      { artist: target.value },
    );
  };

  isDisable = () => {
    const { artist } = this.state;
    const minOfCharacter = 2;
    return artist.length >= minOfCharacter;
  };

  render() {
    return (
      <>
        <div data-testid="page-search">
          <Header />
          <h2>Search</h2>
        </div>
        <div>
          <form>
            <label htmlFor="artistaName">
              Artista:
              <input
                data-testid="search-artist-input"
                type="text"
                name="artistaName"
                id=""
                onChange={ this.handleChange }
              />
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ !this.isDisable() }
              >
                Pesquisar

              </button>
            </label>

          </form>
        </div>
      </>
    );
  }
}

export default Search;
