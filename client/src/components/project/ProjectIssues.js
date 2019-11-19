import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../lib/AuthProvider';

const ProjectIssues = (props) => {
  return (
    <li><Link to={ '/issues/' + props.id }>{ props.title }</Link></li>
  );
};

export default withAuth(ProjectIssues);
