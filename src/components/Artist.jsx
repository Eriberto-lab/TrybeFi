import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Artist extends Component {
  state = {
    artistMsg: false,
  };

  componentDidMount() {
    this.setTrue();
  }

  setTrue = () => {
    this.setState({ artistMsg: true });
  };

  render() {
    const { artistMsg } = this.state;
    const { backupArtist } = this.props;
    return (
      <h3>
        {artistMsg && `Resultado de álbuns de: ${backupArtist}`}
      </h3>
    );
  }
}

Artist.propTypes = {
  backupArtist: PropTypes.string.isRequired,
};
