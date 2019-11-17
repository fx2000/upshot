import React from 'react';

const Issue = (props) => {
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.priority}</td>
      <td>{props.status}</td>
      <td>{props.title}</td>
      <td>{props.description}</td>
      <td>{props.creator}</td>
      <td>{props.assignedTo}</td>
      <td>{props.followers}</td>
      <td>{props.comments}</td>
    </tr>
  );
};

export default Issue;
