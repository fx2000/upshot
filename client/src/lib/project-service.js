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
    const { name, description, imageURL} = project;
    return this.project
      .post('/api/projects/create', {
        name,
        description,
        imageURL
      }).then(
        response => response
      );
  }

  // Update project
  update = (project) => {
    const {
      id,
      name,
      description,
      imageURL
    } = project;
    return this.project
      .put('/api/projects/' + id + '/update', {
        name,
        description,
        imageURL
      }).then(
        response => response
      );
  }

  // Delete project
  delete = (id) => {
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
