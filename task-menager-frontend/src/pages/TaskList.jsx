import { useGlobalContext } from "../contexts/GlobalContext";
import './TaskList.css';

function TaskList() {
  const { tasks, loading } = useGlobalContext();

 if (loading) {
    return <div className="loading-text">Caricamento task in corso...</div>;
  }

  return (
   <div className="main-content">
         <h1>Elenco dei Task</h1>
      
         {tasks.length === 0 ? (
           <p>Ottimo lavoro! Non ci sono task nella lista.</p>
         ) : (
           <ul className="task-list">
             {tasks.map((task) => (
               <li key={task.id} className="task-item">
                 <span>{task.title}</span>
                 <span className="status-icon">
                   {task.completed ? "✅" : "⏳"}
                 </span>
               </li>
             ))}
           </ul>
         )}
      </div>
  )
}


export default TaskList;