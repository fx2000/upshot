import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../lib/AuthProvider';

const UserIssues = (props) => {
  return (
    <tr>
      <td>{ props.priority }</td>
      <td>{ props.status }</td>
      <td><Link to={ '/issues/' + props.id }>{ props.title }</Link></td>
      <td>{ props.project }</td>
      <td>{ props.followers }</td>
      <td>{ props.created }</td>
    </tr>
  );
};

export default withAuth(UserIssues);
