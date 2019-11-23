import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../lib/AuthProvider';

const UserProjects = (props) => {
  return (
    <tr>
      <td><Link to={'/projects/' + props.id}><img src={props.image} alt={props.name} className="list-image" /></Link></td>
      <td><Link to={'/projects/' + props.id}>{ props.name }</Link></td>
      <td>{ props.description }</td>
      <td>{ props.issues }</td>
      <td>{ props.created }</td>
    </tr>
  );
};

export default withAuth(UserProjects);
