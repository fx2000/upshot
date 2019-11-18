import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';

// Bootstrap Components
import {
  Form,
  Button,
  Alert,
  Modal
} from 'react-bootstrap';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: ''
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      email,
      password
    } = this.state;

    this.props.login({
      email,
      password
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render () {
    const { email, password, errors } = this.state;
    return (
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.handleFormSubmit} id="login">
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                autoComplete="email"
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                autoComplete="password"
              />
            </Form.Group>

            <Form.Group controlId="rememberMe">
              <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>

            {
              errors && (
                <Alert variant="danger" dismissible>
                  <p>{ errors }</p>
                </Alert>
              )
            }

          </Form>
          <Link to="/signup"><p>Not a member? Sign up...</p></Link>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" form="login" type="submit" disabled={!email || !password}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

export default withAuth(Login);
