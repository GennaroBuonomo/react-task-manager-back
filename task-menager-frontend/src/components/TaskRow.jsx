import React from 'react';


const TaskRow = React.memo(({ task }) => {
  
 
  const statusClass = task.status ? task.status.toLowerCase().replace(" ", "") : "";

  return (
    <tr>
      <td>{task.title}</td>
      <td className="status-container">
        <span className={`status-badge ${statusClass}`}>
          {task.status}
        </span>
      </td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  );
});

export default TaskRow;