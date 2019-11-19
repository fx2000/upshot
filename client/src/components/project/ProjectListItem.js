import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../lib/AuthProvider';

const ProjectListItem = (props) => {
  return (
    <tr>
      <td><img src={props.image} alt={props.name} className="list-image"/></td>
      <td><Link to={'/projects/' + props.id}>{props.name}</Link></td>
      <td>{props.description}</td>
      <td>{props.issues}</td>
      <td><Link to={'/users/' + props.creatorId}>{props.creatorName}</Link></td>
    </tr>
  );
};

export default withAuth(ProjectListItem);
