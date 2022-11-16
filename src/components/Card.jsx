import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  render() {
    const { children } = this.props;

    return (

      <div>
        <li>
          {children}
        </li>

      </div>
    );
  }
}

Card.propTypes = {
  children: PropTypes.string.isRequired,
};
