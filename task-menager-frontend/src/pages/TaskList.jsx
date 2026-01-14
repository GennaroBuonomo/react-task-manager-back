import { useState, useMemo } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";
import './TaskList.css';

function TaskList() {
  const { tasks, loading } = useGlobalContext();

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);

 //  Mappa per definire l'ordine degli stati
  const statusOrder = { "Todo": 1, "Doing": 2, "Done": 3 }

  // Logica di ordinamento con useMemo
  const sortedTasks = useMemo(() => {
    // Creo una copia per non modificare l'array originale
    return [...tasks].sort((a, b) => {
      let result = 0;

      if (sortBy === "title") {
        result = a.title.localeCompare(b.title);
      } else if (sortBy === "status"){
        result = statusOrder[a.status] - statusOrder[b.status];
      }else if (sortBy === "createdAt") {
       result = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

       return  result * sortOrder;
    });
  }, [tasks, sortBy, sortOrder]);

  // Funzione per gestire il click sulle intestazioni (th)
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder * -1);  // Inverte l'ordine
    } else {
      setSortBy(column);
      setSortOrder(1);  // Reset a crescente per nuova colonna
    }
  }

 if (loading) {
    return <div className="main-content">Caricamento task in corso...</div>;
  }

   // Funzione per mostrare la freccina
  const getSortIcon = (column) => {
    if (sortBy !== column) return "";
    return sortOrder === 1 ? " ▲" : " ▼";
  };

  return (
   <div className="main-content">
         <h1>Elenco dei Task</h1>
      
         {tasks.length === 0 ? (
           <p>Ottimo lavoro! Non ci sono task nella lista.</p>
         ) : (
          <table className="task-table">
            <thead>
              <tr>
              {/* Usiamo className dinamico per lo stile CSS */}
              <th 
                onClick={() => handleSort("title")} 
                className={sortBy === "title" ? "active-sort" : ""}
              >
                Nome {getSortIcon("title")}
              </th>
              <th 
                onClick={() => handleSort("status")} 
                className={sortBy === "status" ? "active-sort" : ""}
              >
                Stato {getSortIcon("status")}
              </th>
              <th 
                onClick={() => handleSort("createdAt")} 
                className={sortBy === "createdAt" ? "active-sort" : ""}
              >
                Data {getSortIcon("createdAt")}
              </th>
              <th>Azioni</th>
            </tr>
            </thead>
            <tbody>
              {sortedTasks.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </tbody>
          </table>
         )}
      </div>
  );
}


export default TaskList;