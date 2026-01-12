import { useState } from "react";
import "./AddTask.css";

function AddTask() {
  const [error, setError] = useState("");
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // unisco tutti i dati dal form in una riga sola
    const data = new FormData(e.target);
    
    //Trasformo i dati in un oggetto facile da usare
    const taskTitle = data.get("title");
    const taskDescription = data.get("description");
    const taskStatus = data.get("status");

    if (!taskTitle.trim()) {
      setError("Il titolo è obbligatorio");
      return;
    }

    const hasSymbols = taskTitle.split("").some((char) => symbols.includes(char));
    if (hasSymbols) {
      setError("Niente simboli speciali!");
      return;
    }

    setError("");

    //Creo l'oggetto finale richiesto dalla Milestone
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
      createdAt: new Date().toISOString()
    };

    console.log("Task creato con FormData:", newTask);
  };

  return (
    <div className="main-content">
      <h1>Nuovo Task (Modo Rapido)</h1>
      <form onSubmit={handleSubmit} className="task-form">
        
        <input name="title" placeholder="Titolo" />
        {error && <p className="error-message">{error}</p>}

        <textarea name="description" placeholder="Descrizione" />

        <select name="status" defaultValue="To do">
          <option value="To do">To do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>

        <button type="submit">Salva Task</button>
      </form>
    </div>
  );
}

export default AddTask