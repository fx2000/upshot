import React from 'react';
import { withAuth } from '../../lib/AuthProvider';

// Bootstrap components
import {
  Toast
} from 'react-bootstrap';

const IssueComments = (props) => {
  return (
    <Toast>
      <Toast.Header>
        <img
          src={ props.avatar }
          className="rounded mr-2"
          alt=""
          width = "30"
          height = "30"
        />
        <strong className="mr-auto">{ props.commenterName }</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>{ props.content }</Toast.Body>
    </Toast>
  );
};

export default withAuth(IssueComments);
