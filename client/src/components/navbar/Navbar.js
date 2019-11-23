import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { withAuth } from '../../lib/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

// Bootstrap components
import {
  Navbar,
  Nav,
  Dropdown,
  DropdownButton
} from 'react-bootstrap';

class Topbar extends Component {
  render () {
    return (
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" sticky="top">
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              alt=""
              src="assets/img/arrow.png"
              width="25"
              height="25"
              className="d-inline-block align-top"
            />{' '}
            <span className="brand-name">upshot</span>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            <DropdownButton
              id="dropdown-item-button"
              title={<FontAwesomeIcon icon={faUser} />}
              size="sm"
              variant="upshot"
              alignRight
            >
              <LinkContainer to='/issues'><Dropdown.Item as="button">Issues</Dropdown.Item></LinkContainer>
              <LinkContainer to='/projects'><Dropdown.Item as="button">Projects</Dropdown.Item></LinkContainer>
              <LinkContainer to='/users'><Dropdown.Item as="button">Team Members</Dropdown.Item></LinkContainer>
              <Dropdown.Divider />
              {
                this.props.user &&

                <LinkContainer to={'/users/' + this.props.user._id}>
                  <Dropdown.Item as="button">{this.props.user.firstName + ' ' + this.props.user.lastName}</Dropdown.Item>
                </LinkContainer>
              }
              <Dropdown.Item as="button" onClick={this.props.logout}>Sign Out</Dropdown.Item>
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withAuth(Topbar);
