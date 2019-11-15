import axios from 'axios';

class Auth {
  constructor () {
    this.auth = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    });
  }

  signup (user) {
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
      })
      .then(({ data }) => data);
  }

  login (user) {
    const { email, password } = user;
    return this.auth
      .post('/api/auth/login', { email, password })
      .then(({ data }) => data);
  }

  logout () {
    return this.auth.post('/api/auth/logout', {})
      .then((response) => response.data);
  }
}

const axiosRequestFunctions = new Auth();
export default axiosRequestFunctions;
