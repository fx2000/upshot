import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';

// Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

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
      <Form onSubmit={this.handleFormSubmit}>
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

        <Link to="/signup"><p>Not a member? Sign up...</p></Link>
        
        <Button variant="primary" type="submit" disabled={!email || !password}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default withAuth(Login);
