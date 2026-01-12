import React from 'react';
import { Link } from 'react-router-dom';

const TaskRow = React.memo(({ task }) => {
  
  const statusClass = task.status ? task.status.toLowerCase().replace(" ", "") : "";

  return (
    <tr>
      <td>
        <Link to={`/task/${task.id}`} className="task-title-link">
          {task.title}
        </Link>
      </td>
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