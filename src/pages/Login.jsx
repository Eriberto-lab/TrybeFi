import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    name: '',
    isLoading: false,
  };

  isDisable = () => {
    const { name } = this.state;
    const minOfCharacter = 3;
    return name.length >= minOfCharacter;
  };

  handleChange = (event) => {
    const { target } = event;

    this.setState(
      { name: target.value },
    );
  };

  callApi = async () => {
    this.setState({ isLoading: true }, async () => {
      const { name } = this.state;
      const { history } = this.props;
      await createUser({ name });
      history.push('/search');
    });
  };

  render() {
    const { name, isLoading } = this.state;

    return (
      <div data-testid="page-login">
        <p> Login Page</p>
        <form>
          <label htmlFor="inputName">
            Nome:
            <input
              data-testid="login-name-input"
              type="text"
              name="nameOfinput"
              id="inputName"
              onChange={ this.handleChange }
              value={ name }
            />
          </label>
          <input
            data-testid="login-submit-button"
            type="button"
            value="Entrar"
            onClick={ this.callApi }
            disabled={ !this.isDisable() }
          />
          <div>
            {isLoading && <Loading /> }

          </div>
        </form>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goFoward: PropTypes.func,
    lenght: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
      state: PropTypes.shape({
        path: PropTypes.string,
        state: PropTypes.string,
      }),
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};
