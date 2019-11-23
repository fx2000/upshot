import axios from 'axios';

// Issue API
class IssueService {
  constructor () {
    this.issue = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  // List issues
  list = () => {
    return this.issue.get('/api/issues').then(
      response => response
    );
  }

  // Create issue
  create = (issue) => {
    const {
      title,
      content,
      project,
      priority,
      attachments
    } = issue;
    return this.issue
      .post('/api/issues/create', {
        title,
        content,
        project,
        priority,
        attachments
      }).then(
        response => response
      );
  }

  // Update issue
  update = (issue) => {
    const {
      id,
      title,
      content,
      project,
      priority,
      status,
      attachments
    } = issue;
    return this.issue
      .put('/api/issues/' + id + '/update', {
        title,
        content,
        project,
        priority,
        status,
        attachments
      }).then(
        response => response
      );
  }

  // Delete issue
  delete = (id) => {
    return this.issue.get('/api/issues/' + id + '/delete').then(
      response => response
    );
  }

  // Get issue details
  details = (id) => {
    return this.issue.get('/api/issues/' + id).then(
      response => response
    );
  }

  // New comment
  comment = (comment) => {
    const {
      issue,
      content
    } = comment;
    return this.issue
      .post('/api/issues/' + issue + '/comment', {
        content
      }).then(
        response => response
      );
  }

  // Follow issue
  follow = (issue) => {
    const { id } = issue;
    return this.issue.get('/api/issues/' + id + '/follow').then(
      response => response
    );
  }

  // Unfollow issue
  unfollow = (issue) => {
    const { id } = issue;
    return this.issue.get('/api/issues/' + id + '/unfollow').then(
      ({ data }) => data
    );
  }

  // Takeover issue
  takeover = (issue) => {
    const { id } = issue;
    return this.issue.get('/api/issues/' + id + '/takeover').then(
      ({ data }) => data
    );
  }

  // Release issue
  release = (issue) => {
    const { id } = issue;
    return this.issue.get('/api/issues/' + id + '/release').then(
      ({ data }) => data
    );
  }

  // Assign issue
  assign = (issue) => {
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
