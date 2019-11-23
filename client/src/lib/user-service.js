import axios from 'axios';

// Users API
class UserService {
  constructor () {
    this.user = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  // List users
  list = () => {
    return this.user.get('/api/users').then(
      response => response
    );
  }

  // Update user
  update = (user) => {
    const {
      id,
      firstName,
      lastName,
      email,
      avatar
    } = user;
    return this.user
      .put('/api/users/' + id + '/update', {
        id,
        firstName,
        lastName,
        email,
        avatar
      }).then(
        response => response
      );
  }

  // Get user details
  details = (userId) => {
    return this.user.get('/api/users/' + userId).then(
      response => response
    );
  }
}

const axiosRequestFunctions = new UserService();
export default axiosRequestFunctions;
