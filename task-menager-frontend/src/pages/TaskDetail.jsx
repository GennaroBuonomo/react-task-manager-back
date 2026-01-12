import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import "./TaskDetail.css"

function TaskDetail() {
  const { id } = useParams();
  const { tasks, removeTasks } = useGlobalContext();
  const navigate = useNavigate()

    const task = tasks.find((t) => String(t.id) === String(id));

    if(!task) {
      return <div className="main-content"><p>Task non trovata...</p></div>
    }

    const handleDelete = async () => {
      console.log("Elimina task:", task.id);

      try{
        await removeTasks(task.id);
        alert("Task eliminata con successo!");
        navigate("/")
      }catch (err){
        alert(`Errore: ${err.message}`)
      }
    };

    return (
      <div className="main-content">
        <div className="task-detail-card">
          <button onClick={() => navigate(-1)} className="back-btn">Torna indietro</button>
          
          <h1>{task.title}</h1>

          <div className="details-info">
            <p><strong>Descrizione:</strong>{task.description || "Nessuna descrizione"}</p>
            <p><strong>Stato</strong><span className={`badge ${task.status}`}>{task.status}</span></p>
            <p><strong>Creato il:</strong>{new Date(task.createdAt).toLocaleString()}</p>
          </div>

          <button onClick={handleDelete} className="delete-btn-detail">
            Elimina task
          </button>
        </div>
      </div>
    );
}

export default TaskDetail