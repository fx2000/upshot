import React, { Component } from 'react';
import { withAuth } from '../../lib/AuthProvider';
import issues from '../../lib/issue-service';
import projects from '../../lib/project-service';
import { LinkContainer } from 'react-router-bootstrap';

// Bootstrap Components
import {
  Form,
  Button,
  Alert,
  Breadcrumb,
  Container,
  Row
} from 'react-bootstrap';

class CreateIssue extends Component {
  constructor () {
    super();
    this.state = {
      title: '',
      content: '',
      project: '',
      priority: '',
      errors: '',
      projects: []
    };
  }

  // Form submit handler
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      content,
      project,
      priority
    } = this.state;

    issues.create({
      title,
      content,
      project,
      priority
    });

    this.setState({
      title: '',
      content: '',
      project: '',
      priority: ''
    });
    // TODO: Fix redirect so it refreshes
    this.props.history.push('/issues');
  }

  // Form change handler
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  componentDidMount () {
    // Get Projects list
    projects.list().then(
      response => {
        const projects = response.data;
        if (projects.length > 0) {
          this.setState({ projects });
        }
      }
    ).catch(error => console.log(error));
  }

  render () {
    const {
      title,
      content,
      errors
    } = this.state;

    return (
      <Container fluid={true}>
        <Row>
          <Breadcrumb>
            <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
            <LinkContainer to="/issues"><Breadcrumb.Item>Issues</Breadcrumb.Item></LinkContainer>
            <Breadcrumb.Item active>Create Issue</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <h2>Create Issue</h2>
        </Row>
        <Row>
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Group controlId="title" >
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={this.handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="content" >
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="textarea"
                rows="10"
                name="content"
                value={content}
                onChange={this.handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="project">
              <Form.Label>Project</Form.Label>
              <Form.Control as="select" onChange={this.handleChange} name="project" required>
                {
                  this.state.projects && this.state.projects.map(project => (
                    <option value={project._id} key={project._id}>{project.name}</option>
                  ))
                }
              </Form.Control>
            </Form.Group>

            <Form.Group controlId = "priority">
              <Form.Label>Priority</Form.Label>
              <Form.Control as="select" onChange={this.handleChange} name="priority" required>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </Form.Control>
            </Form.Group>

            {errors && (<Alert variant="danger" dismissible><p>{errors}</p></Alert>)}

            <Button variant="primary" type="submit" disabled={!title || !content}>
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}

export default withAuth(CreateIssue);
