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

class Login extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      errors: ''
    };
  }

  // Form submit handler
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

  // Form change handler
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

            {/* TODO: Implement this control */}
            <Form.Group controlId="rememberMe">
              <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>

            {errors && (<Alert variant="danger" dismissible><p>{ errors }</p></Alert>)}

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
