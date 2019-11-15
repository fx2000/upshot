import React from 'react';

// Bootstrap Components
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Signup = () => {
  return (
    <Form>
      <Form.Group controlId="formBasicText">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      < Form.Group controlId = "formBasicText" >
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Enter a Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Confirm your Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="I Agree to the terms and conditions" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Signup;
