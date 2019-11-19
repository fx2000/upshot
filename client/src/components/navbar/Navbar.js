import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

// Bootstrap components
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';

const navbar = () => {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <LinkContainer to="/">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="assets/img/arrow.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          upshot
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Menu" id="basic-nav-dropdown">
            <LinkContainer to='/issues'><NavDropdown.Item>Issues</NavDropdown.Item></LinkContainer>
            <LinkContainer to='/projects'><NavDropdown.Item>Projects</NavDropdown.Item></LinkContainer>
            <LinkContainer to='/users'><NavDropdown.Item>Users</NavDropdown.Item></LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/login"><NavDropdown.Item>Sign In</NavDropdown.Item></LinkContainer>
            {/* TODO: Add logout call here */}
            <NavDropdown.Item onClick="">Sign Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default navbar;
