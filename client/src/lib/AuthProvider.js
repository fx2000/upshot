import React, { Component} from 'react';
import auth from './auth-service';

const { Consumer, Provider } = React.createContext();

// Consumer
const withAuth = (WrappedComponent) => {
  return class extends Component {
    render () {
      return (
        <Consumer>
          {
            ({login, signup, user, logout, isLoggedin}) => {
              return (
                <WrappedComponent
                  login = { login }
                  signup = { signup }
                  user = { user }
                  logout = { logout }
                  isLoggedin = { isLoggedin }
                  {...this.props}
                />
              );
            }
          }
        </Consumer>
      );
    }
  };
};

// Provider
class AuthProvider extends Component {
  constructor () {
    super();
    this.state = {
      isLoggedin: false,
      user: null,
      isLoading: true
    };
  }

  componentDidMount = () => {
    auth
      .me()
      .then(
        user => this.setState({
          isLoggedin: true,
          user: user,
          isLoading: false
        })
      ).catch(
        err => {
          this.setState({
            isLoggedin: false,
            user: null,
            isLoading: false
          });
          console.log(err);
        }
      );
  };

  // Sign up
  signup = (user) => {
    const {
      firstName,
      lastName,
      email,
      password
    } = user;
    auth
      .signup({
        firstName,
        lastName,
        email,
        password
      }).then(
        user => this.setState({ isLoggedin: true, user })
      ).catch(
        ({ response }) => this.setState({ message: response.data.statusMessage })
      );
  };

  // Login
  login = (user) => {
    const { email, password } = user;
    auth
      .login({ email, password })
      .then(user => this.setState({ isLoggedin: true, user }))
      .catch(err => console.log(err));
  };

  // Logout
  logout = () => {
    auth
      .logout()
      .then(() => this.setState({ isLoggedin: false, user: null }))
      .catch(err => console.log(err));
  }

  render = () => {
    const { isLoading, isLoggedin, user } = this.state;
    const { login, logout, signup } = this;

    return isLoading ? (
      <div> { /* TODO: Better loading screen */ }
        <img
          alt=""
          src="assets/img/arrow.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        Loading...
      </div>
    ) : (
      <Provider value={{ isLoggedin, user, login, logout, signup }}>
        { this.props.children }
      </Provider>
    );
  }
}

export { Consumer, withAuth };
export default AuthProvider;
