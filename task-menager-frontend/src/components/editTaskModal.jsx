import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";

function EditTaskModal({ show, onClose, task, onSave }) {
  const [formData, setFormData] = useState({ ...task });
  const formRef = useRef(null);

 
  useEffect(() => {
    setFormData({ ...task });
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); 
  };

  return (
    <Modal
      show={show}
      title="Modifica Task"
      onClose={onClose}
      confirmText="Salva"
      onConfirm={() => formRef.current.requestSubmit()}
      content={
        <form ref={formRef} onSubmit={handleSubmit} className="task-form-edit">
          <label>Titolo</label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
          
          <label>Descrizione</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
          />
          
          <label>Stato</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </form>
      }
    />
  );
}

export default EditTaskModal;