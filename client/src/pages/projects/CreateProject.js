import React, { Component } from 'react';
import { withAuth } from '../../lib/AuthProvider';
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

class CreateProject extends Component {
  constructor () {
    super();
    this.state = {
      name: '',
      description: '',
      image: '',
      errors: ''
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      description,
      image
    } = this.state;

    projects.create({
      name,
      description,
      image
    });

    this.setState({
      name: '',
      description: '',
      image: ''
    });
    // TODO: Fix redirect so it refreshes
    this.props.history.push('/projects')
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render () {
    const {
      name,
      description,
      image,
      errors
    } = this.state;

    return (
      <Container fluid = { true }>
        <Row>
          <Breadcrumb>
            <LinkContainer to = "/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
            <LinkContainer to = "/projects"><Breadcrumb.Item>Projects</Breadcrumb.Item></LinkContainer>
            <Breadcrumb.Item active>Create Project</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <h2>Create Project</h2>
        </Row>
        <Row>
          <Form onSubmit = { this.handleFormSubmit }>
            <Form.Group controlId = "name" >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type = "text"
                name = "name"
                value = { name }
                onChange = { this.handleChange }
                required
              />
            </Form.Group>

            <Form.Group controlId = "description" >
              <Form.Label>Description</Form.Label>
              <Form.Control
                type = "text"
                name = "description"
                value = { description }
                onChange = { this.handleChange }
                required
              />
            </Form.Group>

            <Form.Group controlId = "image" >
              <Form.Label>Project Image</Form.Label>
              <Form.Control
                type = "file"
                name = "image"
              />
            </Form.Group>

            {
              errors && (
                <Alert variant = "danger" dismissible>
                  <p>{ errors }</p>
                </Alert>
              )
            }

            <Button variant="primary" type="submit" disabled = { !name || !description }>
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}

export default withAuth(CreateProject);
