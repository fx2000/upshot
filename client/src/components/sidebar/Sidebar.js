import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

// Bootstrap components
import ListGroup from 'react-bootstrap/ListGroup';

const Sidebar = () => {
  return (
    <ListGroup variant="flush">
      <LinkContainer to="/"><ListGroup.Item action>Dashboard</ListGroup.Item></LinkContainer>
      <LinkContainer to="/projects"><ListGroup.Item action>Projects</ListGroup.Item></LinkContainer>
      <LinkContainer to="/issues"><ListGroup.Item action>Issues</ListGroup.Item></LinkContainer>
    </ListGroup>
  );
};

export default Sidebar;
