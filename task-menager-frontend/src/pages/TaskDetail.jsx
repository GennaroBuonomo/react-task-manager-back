import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/editTaskModal";
import "./TaskDetail.css";

function TaskDetail() {
  const { id } = useParams();
  const { tasks, removeTask } = useGlobalContext();
  const navigate = useNavigate();


  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const task = tasks.find((t) => String(t.id) === String(id));

  if (!task) {
    return (
      <div className="main-content">
        <p>Task non trovata...</p>
        <button onClick={() => navigate("/")}>Torna alla lista</button>
      </div>
    );
  }

 
  const confirmDelete = async () => {
    try {
      await removeTask(task.id);
      setShowModal(false);
      alert("Task eliminata con successo!");
      navigate("/"); 
    } catch (err) {
      alert(`Errore: ${err.message}`);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updateTask(updatedData);
      setShowEditModal(false);
      alert("Task aggiornata correttamente!");
    } catch (err) {
      alert(`Errore: ${err.message}`);
    }
  };

  return (
    <div className="main-content">
      <div className="task-detail-card">
        <button onClick={() => navigate(-1)} className="back-btn">← Torna indietro</button>
        
        <h1>{task.title}</h1>

        <div className="details-info">
          <p><strong>Descrizione:</strong> {task.description || "Nessuna descrizione"}</p>
          <p><strong>Stato:</strong> <span className={`badge ${task.status}`}>{task.status}</span></p>
          <p><strong>Creato il:</strong> {new Date(task.createdAt).toLocaleString()}</p>
        </div>

        {/* Cliccando qui NON eliminiamo subito, ma apriamo la modale */}
        <button onClick={() => setShowModal(true)} className="delete-btn-detail">
          Elimina task
        </button>
      </div>

    
      <Modal 
        show={showModal} 
        title="Conferma eliminazione" 
        content={`Sei sicuro di voler eliminare il task "${task.title}"? L'azione è irreversibile.`}
        onClose={() => setShowModal(false)} 
        onConfirm={confirmDelete}
        confirmText="Sì, elimina"
      />

      <EditTaskModal 
        show={showEditModal}
        task={task}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdate}
      />
    </div>
  );
}

export default TaskDetail;