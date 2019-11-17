import axios from 'axios';

class ProjectService {
  constructor () {
    this.project = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  list () {
    return this.project.get('/api/projects').then(
      ({ data }) => data
    );
  }

  create (project) {
    const { name, description } = project;
    return this.project
      .post('/api/projects/create', {
        name,
        description
      }).then(
        ({ data }) => data
      );
  }

  update (project) {
    const {
      id,
      name,
      description
    } = project;
    return this.project
      .put('/api/projects/' + id + '/update', {
        name,
        description
      }).then(
        ({ data }) => data
      );
  }

  delete (project) {
    const { id } = project;
    return this.project.get('/api/' + id + '/delete').then(
      ({ data }) => data
    );
  }

  details (project) {
    const { id } = project;
    return this.project.get('/api/' + id).then(
      ({ data }) => data
    );
  }
}

const axiosRequestFunctions = new ProjectService();
export default axiosRequestFunctions;
