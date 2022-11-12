import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    user: '',
    isLoading: false,
  };

  componentDidMount() {
    this.getUserApi();
  }

  getUserApi = async () => {
    const response = await getUser();
    this.setState({ user: response.name, isLoading: true });
    return response;
  };

  render() {
    const { user, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <div>Header</div>
        <div>
          <Link data-testid="link-to-search" to="/search">Pesquise</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>

        </div>

        <span data-testid="header-user-name">
          {isLoading ? user : <Loading /> }
        </span>
      </header>

    );
  }
}
