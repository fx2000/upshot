import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../lib/AuthProvider';

const ProjectIssues = (props) => {
  return (
    <tr>
      <td>{ props.priority }</td>
      <td>{ props.status }</td>
      <td><Link to={'/issues/' + props.id}>{ props.title }</Link></td>
      <td>{ props.description }</td>
      <td><Link to={'/users/' + props.creatorId}>{ props.creatorName }</Link></td>
      <td>{ props.followers }</td>
      <td>{ props.comments }</td>
    </tr>
  );
};

export default withAuth(ProjectIssues);
