import axios from 'axios';

// Auth API
class AuthService {
  constructor () {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  // Sign up
  signup = (user) => {
    const {
      firstName,
      lastName,
      email,
      password
    } = user;
    return this.auth
      .post('/api/auth/signup', {
        firstName,
        lastName,
        email,
        password
      }).then(
        ({ data }) => data
      );
  }

  // Login
  login = (user) => {
    const { email, password } = user;
    return this.auth
      .post('/api/auth/login', { email, password })
      .then(({ data }) => data);
  }

  // Logout
  logout = () => {
    return this.auth.post('/api/auth/logout', {}).then(
      ({ data }) => data
    );
  }

  // Get current user's information
  me = () => {
    return this.auth.get('/api/auth/me').then(
      ({ data }) => data
    );
  }
}

const auth = new AuthService();
export default auth;
