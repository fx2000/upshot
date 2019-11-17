import React from 'react';

const Project = (props) => {
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.name}</td>
      <td>{props.description}</td>
      <td>{props.issues}</td>
      <td>{props.creator}</td>
    </tr>
  );
};

export default Project;
