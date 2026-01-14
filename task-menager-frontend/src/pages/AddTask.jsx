import { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import "./AddTask.css";

export default function AddTask() {
  const { addTask } = useGlobalContext();
  const [error, setError] = useState("");
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    
    const taskTitle = data.get("title");

    // Validazione
    if (!taskTitle.trim()) {
      setError("Il titolo è obbligatorio!");
      return;
    }

    const hasSymbols = taskTitle.split("").some((char) => symbols.includes(char));
    if (hasSymbols) {
      setError("Non puoi usare simboli speciali nel titolo");
      return;
    }

    const newTask = {
      title: taskTitle,
      description: data.get("description"),
      status: data.get("status"),
    };

    try {
      // Chiamata all'API tramite l'hook
      await addTask(newTask);
      
      alert("Task creato con successo!");
      form.reset(); // Svuota il form
      setError(""); // Pulisce l'errore
    } catch (err) {
      alert(`Errore: ${err.message}`);
    }
  };

  return (
    <div className="main-content">
      <h1>Aggiungi Nuovo Task</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <label>Titolo del Task</label>
        <input name="title" placeholder="Cosa devi fare?" />
        {error && <p className="error-message">{error}</p>}

        <label>Descrizione</label>
        <textarea name="description" placeholder="Aggiungi dettagli..." />

        <label>Stato iniziale</label>
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