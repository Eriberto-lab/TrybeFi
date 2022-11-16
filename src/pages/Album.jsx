import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = {
    artistName: '',
    bandName: '',
    arrayOfMusic: [],
    image: '',
    checked: {},
    loading: false,
    favorites: [],
  };

  async componentDidMount() {
    this.callApi();

    const { match: { params: { id } } } = this.props;
    const musicsAPI = await getMusics(id);

    this.setState({
      arrayOfMusic: musicsAPI,
      artistName: musicsAPI[0].artistName,
      bandName: musicsAPI[0].collectionName,
      image: musicsAPI[0].artworkUrl100,
    }, this.callFavoriteApi);
  }

  callApi = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const arrayOfAlbum = await getMusics(id);
    const [one] = arrayOfAlbum;
    this.setState({
      artistName: one.artistName,
      bandName: one.collectionName,
      arrayOfMusic: arrayOfAlbum,
      image: arrayOfAlbum[0].artworkUrl100 });
  };

  callFavoriteApi = async () => {
    const { arrayOfMusic } = this.state;
    const favoritesAPI = await getFavoriteSongs();
    const favorites = favoritesAPI
      .filter((fav) => fav.artistId === arrayOfMusic[0].artistId);

    this.setState({ favorites });
    if (favorites.length > 0) {
      this.setState({ loading: true }, () => {
        favorites.forEach((music) => {
          this.setState((prevState) => ({
            checked: { ...prevState.checked, [music.trackName]: true },
            loading: false,
          }));
        });
      });
    }
  };

  handleChange = async ({ target }) => {
    const { arrayOfMusic } = this.state;
    const { name, id, checked } = target;
    const allMusics = arrayOfMusic.slice(1);

    const findMusic = allMusics.filter(({ trackId }) => trackId === id);

    this.setState((prevState) => ({
      checked: { ...prevState.checked, [name]: checked },
    }));

    if (checked) {
      this.setState({ loading: true }, async () => {
        await addSong(findMusic);
        await removeSong(findMusic);
        this.setState({ loading: false });
      });
    } else {
      this.setState({ loading: true }, async () => {
        await removeSong(findMusic);
        this.setState({ loading: false });
      });
    }
  };

  render() {
    const {
      artistName,
      bandName, arrayOfMusic, image, loading, checked, favorites } = this.state;
    const filteredArray = arrayOfMusic.slice(1);
    return (
      <>
        <Header />
        <div data-testid="page-album" />
        <h2 data-testid="artist-name">
          {artistName}
        </h2>
        <p data-testid="album-name">{bandName}</p>
        {loading ? <Loading /> : filteredArray.map(
          (element) => {
            const { trackId, previewUrl, trackName } = element;
            return ((<MusicCard
              key={ trackId }
              previewUrl={ previewUrl }
              trackName={ trackName }
              trackId={ trackId }
              image={ image }
              album={ bandName }
              checked={ checked[trackName] }
              handleChange={ this.handleChange }
              value={ favorites }

            />));
          },
        )}

      </>

    );
  }
}

export default Album;

Album.propTypes = {
  collectionId: PropTypes.string,
  artistId: PropTypes.string,
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
  collectionPrice: PropTypes.string,
  artworkUrl100: PropTypes.string,
  releaseDate: PropTypes.string,
  trackCount: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;
