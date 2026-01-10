import { useGlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";
import './TaskList.css';

function TaskList() {
  const { tasks, loading } = useGlobalContext();

 if (loading) {
    return <div className="main-content">Caricamento task in corso...</div>;
  }

  return (
   <div className="main-content">
         <h1>Elenco dei Task</h1>
      
         {tasks.length === 0 ? (
           <p>Ottimo lavoro! Non ci sono task nella lista.</p>
         ) : (
          <table className="task-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Stato</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </tbody>
          </table>
         )}
      </div>
  );
}


export default TaskList;