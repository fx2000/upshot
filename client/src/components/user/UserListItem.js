import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../lib/AuthProvider';

const UserListItem = (props) => {
  return (
    <tr>
      <td><img src={props.avatar} alt={props.name} className="list-image" /></td>
      <td><Link to={'/users/' + props.id}>{props.name}</Link></td>
      <td><a href={'mailto://' + props.email}>{props.email}</a></td>
      <td>{props.projects}</td>
      <td>{props.issues}</td>
      <td>{props.comments}</td>
      <td>{props.following}</td>
      <td>{props.assignedTo}</td>
      <td>{props.created}</td>
    </tr>
  );
};

export default withAuth(UserListItem);
