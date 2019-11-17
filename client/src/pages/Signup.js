import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';


// Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class Signup extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    errors: ''
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password
    } = this.state;

    this.props.signup({
      firstName,
      lastName,
      email,
      password
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render () {
    const {
      firstName,
      lastName,
      email,
      password,
      errors
    } = this.state;

    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Group controlId = "firstName" >
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
            autoComplete="given-name"
            required
          />
        </Form.Group>

        < Form.Group controlId = "lastName" >
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
            autoComplete = "family-name"
            required
          />
        </Form.Group>

        < Form.Group controlId = "email" >
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

        < Form.Group controlId = "password" >
          <Form.Label>Enter a Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            autoComplete="new-password"
          />
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="I Agree to the terms and conditions" />
        </Form.Group>

        {
          errors && (
            <Alert variant="danger" dismissible>
              <p>{ errors }</p>
            </Alert>
          )
        }

        <Link to="/login"><p>Already have an account? Sign in...</p></Link>

        <Button variant="primary" type="submit" disabled={!firstName || !lastName || !email || !password}>
          Submit
        </Button>
      </Form>
    )
  }
}

export default withAuth(Signup);
