// import { element } from 'prop-types';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { trackName,
      bandName,
      image,
      previewUrl, trackId, handleChange, checked } = this.props;

    return (
      <div>
        <div>
          <img src={ image } alt={ bandName } />
          <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              onChange={ handleChange }
              type="checkbox"
              name={ trackName }
              id={ trackId }
              checked={ checked }
            />
          </label>
          <p>{ trackName }</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  image: PropTypes.string,
}.isRequired;
