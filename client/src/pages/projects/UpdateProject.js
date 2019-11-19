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

class UpdateProject extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: '',
      description: '',
      image: '',
      errors: ''
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      id,
      name,
      description,
      image
    } = this.state;

    projects.update({
      id,
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

  componentDidMount () {
    const { id } = this.props.match.params;
    projects.details(id).then(
      response => {
        const project = response.data;
        this.setState({
          name: project.name,
          description: project.description,
          image: project.image
        });
      }
    ).catch(error => console.log(error));
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
            <LinkContainer to = { '/projects/' + this.state.id }><Breadcrumb.Item>{ this.state.name }</Breadcrumb.Item></LinkContainer>
            <Breadcrumb.Item active>Update Project</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <h2>Update Project</h2>
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

            {/* <Form.Group controlId = "image" >
              <Form.Label>Project Image</Form.Label>
            </Form.Group> */}

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

export default withAuth(UpdateProject);
