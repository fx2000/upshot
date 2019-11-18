import axios from 'axios';

class IssueService {
  constructor () {
    this.issue = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  list () {
    return this.issue.get('/api/issues').then(
      response => response
    );
  }

  create (issue) {
    const {
      title,
      content,
      project,
      priority
    } = issue;
    return this.issue
      .post('/api/issues/create', {
        title,
        content,
        project,
        priority
      }).then(
        response => response
      );
  }

  update (issue) {
    const {
      id,
      title,
      content,
      project,
      priority,
      status
    } = issue;
    return this.issue
      .put('/api/issues/' + id + '/update', {
        title,
        content,
        project,
        priority,
        status
      }).then(
        response => response
      );
  }

  delete (issue) {
    const { id } = issue;
    return this.issue.get('/api/issues/' + id + '/delete').then(
      response => response
    );
  }

  details (id) {
    return this.issue.get('/api/issues/' + id).then(
      response => response
    );
  }

  comment (issue) {
    const {
      id,
      content
    } = issue;
    return this.issue
      .post('/api/issues/' + id + '/comment', {
        content
      }).then(
        response => response
      );
  }

  follow (issue) {
    const { id } = issue;
    return this.issue.get('/api/issues/' + id + '/follow').then(
      response => response
    );
  }

  unfollow (issue) {
    const { id } = issue;
    return this.issue.get('/api/issues/' + id + '/unfollow').then(
      ({ data }) => data
    );
  }

  takeover (issue) {
    const { id } = issue;
    return this.issue.get('/api/issues/' + id + '/takeover').then(
      ({ data }) => data
    );
  }

  release (issue) {
    const { id } = issue;
    return this.issue.get('/api/issues/' + id + '/release').then(
      ({ data }) => data
    );
  }

  assign (issue) {
    const {
      id,
      user
    } = issue;
    return this.issue
      .post('/api/issues/' + id + '/assign', {
        user
      }).then(
        ({ data }) => data
      );
  }
}

const axiosRequestFunctions = new IssueService();
export default axiosRequestFunctions;
