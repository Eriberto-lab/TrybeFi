import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    artistName: '',
    bandName: '',
    arrayOfMusic: [],
    image: '',
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

  render() {
    const { artistName, bandName, arrayOfMusic, image } = this.state;
    const filteredArray = arrayOfMusic.slice(1);
    return (
      <>
        <Header />
        <div data-testid="page-album" />
        <h2 data-testid="artist-name">
          {artistName}
        </h2>
        <p data-testid="album-name">{bandName}</p>
        { filteredArray.map(
          (element) => {
            const { trackId, previewUrl, trackName } = element;
            return ((<MusicCard
              key={ trackId }
              previewUrl={ previewUrl }
              trackName={ trackName }
              trackId={ trackId }
              image={ image }
              album={ bandName }
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
