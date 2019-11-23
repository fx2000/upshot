import React from 'react';
import { withAuth } from '../../lib/AuthProvider';
import { Link } from 'react-router-dom';

const UserComments = (props) => {
  return (
    <tr>
      <td><Link to={ '/issues/' + props.issueId }>{ props.issue }</Link></td>
      <td>{ props.comment }</td>
      <td>{ props.posted }</td>
    </tr>
  );
};

export default withAuth(UserComments);
