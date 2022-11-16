import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = {
    artistName: '',
    bandName: '',
    arrayOfMusic: [],
    image: '',
    checked: {},
    loading: false,
  };

  componentDidMount() {
    this.callApi();
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

  handleChange = async ({ target }) => {
    const { arrayOfMusic } = this.state;
    const { name, id, checked } = target;
    const allMusics = arrayOfMusic.slice(1);

    const findMusic = allMusics.find((element) => {
      const { trackId } = element;
      return trackId === id;
    });

    this.setState((prevState) => ({
      checked: { ...prevState.checked, [name]: checked },
    }));

    if (checked) {
      this.setState({ loading: true }, async () => {
        await addSong(findMusic);
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
    const { artistName, bandName, arrayOfMusic, image, loading, checked } = this.state;
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
