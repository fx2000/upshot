import axios from 'axios';

// Project API
class ProjectService {
  constructor () {
    this.project = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  // List projects
  list = () => {
    return this.project.get('/api/projects').then(
      response => response
    );
  }

  // Create project
  create = (project) => {
    const { name, description, file} = project;
    return this.project
      .post('/api/projects/create', {
        name,
        description
      }).then(
        response => response
      );
  }

  // Update prject
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

  // Delete project
  delete = (project) => {
    const { id } = project;
    return this.project.get('/api/projects/' + id + '/delete').then(
      response => response
    );
  }

  // Get project details
  details = (projectId) => {
    return this.project.get('/api/projects/' + projectId).then(
      response => response
    );
  }
}

const axiosRequestFunctions = new ProjectService();
export default axiosRequestFunctions;
