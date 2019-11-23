import React from 'react';
import { withAuth } from '../../lib/AuthProvider';
import { Link } from 'react-router-dom';

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
        <strong className="mr-auto"><Link to={'/users/' + props.commenterId}>{ props.commenterName }</Link></strong>
        <small>{ props.created }</small>
      </Toast.Header>
      <Toast.Body>{ props.content }</Toast.Body>
    </Toast>
  );
};

export default withAuth(IssueComments);
