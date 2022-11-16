import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Artist from '../components/Artist';

class Search extends React.Component {
  state = {
    artist: '',
    albuns: [],
    isLoading: false,
    backupArtist: '',
    albumNull: false,
    artistMsg: false,

  };

  handleChange = (event) => {
    const { target } = event;

    this.setState({ artist: target.value });
  };

  isDisable = () => {
    const { artist } = this.state;
    const minOfCharacter = 2;
    return artist.length >= minOfCharacter;
  };

  handleClick = async () => {
    const { artist } = this.state;
    this.setState({ isLoading: true });

    this.setState({ backupArtist: artist,

      artist: '',
      albuns: await searchAlbumsAPI(artist) }, () => {
      this.checkAlbunsAnLoading();
    });
  };

  checkAlbunsAnLoading = () => {
    const { albuns } = this.state;
    if (albuns.length === 0) { this.setState({ albumNull: true }); }
    this.setState({ artistMsg: true, isLoading: false });
  };

  render() {
    const { artist, albuns, isLoading, backupArtist, albumNull, artistMsg } = this.state;
    return (
      <>
        <div data-testid="page-search">
          <Header />
          <h2>Search</h2>
        </div>
        {isLoading && <Loading /> }
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
                value={ artist }
              />
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ !this.isDisable() }
                onClick={ this.handleClick }
              >
                Pesquisar

              </button>
            </label>

          </form>
          <div>

            {artistMsg
              && <Artist backupArtist={ backupArtist } />}

            <div>
              {albumNull && 'Nenhum álbum foi encontrado'}
              {albuns
                .map(
                  (element, i) => (
                    <Card
                      albuns={ albuns }
                      key={ i }
                    >
                      {element.collectionName}
                      <Link
                        data-testid={ `link-to-album-${element.collectionId}` }
                        to={ `/album/${element.collectionId}` }
                      >

                        Link

                      </Link>
                    </Card>),
                )}
            </div>

          </div>
        </div>
      </>
    );
  }
}

export default Search;
