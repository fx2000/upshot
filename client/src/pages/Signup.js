import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';

// Bootstrap Components
import {
  Form,
  Button,
  Alert,
  Modal,
  Container,
  Row,
  Col,
  Navbar
} from 'react-bootstrap';

class Signup extends Component {
  constructor () {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: ''
    };
  }

  // Form submit handler
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

  // Form change handler
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
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          { /* TODO: Center the logo with CSS */ }
          <Container>
            <Row className="show-grid">
              <Col xs={6} md={4}>
              </Col>
              <Col xs={6} md={4}>
                <Navbar.Brand>
                  <img
                    alt=""
                    src="assets/img/arrow.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />{' '}
                  upshot
                </Navbar.Brand>
              </Col>
              <Col xs={6} md={4}>
              </Col>
            </Row>
          </Container>
          <Form onSubmit={this.handleFormSubmit} id="signup">
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
            { /* TODO: Implement this control */ }
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="I Agree to the terms and conditions" />
            </Form.Group>

            {errors && (<Alert variant="danger" dismissible><p>{errors}</p></Alert>)}
          </Form>
          <Link to="/login"><p>Already have an account? Sign in...</p></Link>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" type="submit" form="signup" disabled={!firstName || !lastName || !email || !password}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    )
  }
}

export default withAuth(Signup);
