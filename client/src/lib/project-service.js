import axios from 'axios';

class ProjectService {
  constructor () {
    this.project = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  list = () => {
    return this.project.get('/api/projects').then(
      response => response
    );
  }

  create = (project) => {
    const { name, description } = project;
    return this.project
      .post('/api/projects/create', {
        name,
        description
      }).then(
        response => response
      );
  }

  update = (project) => {
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
        response => response
      );
  }

  delete = (project) => {
    const { id } = project;
    return this.project.get('/api/projects/' + id + '/delete').then(
      response => response
    );
  }

  details = (projectId) => {
    return this.project.get('/api/projects/' + projectId).then(
      response => response
    );
  }
}

const axiosRequestFunctions = new ProjectService();
export default axiosRequestFunctions;
