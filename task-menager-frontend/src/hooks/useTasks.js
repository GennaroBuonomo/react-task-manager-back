import { useState, useEffect } from "react"; 

export const useTasks = () => { 
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${apiUrl}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Errore:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (newTask) => console.log("Aggiungo:", newTask);
  const removeTask = async (id) => console.log("Rimuovo:", id);
  const updateTask = async (id, data) => console.log("Aggiorno:", id);

  return { tasks, loading, addTask, removeTask, updateTask, refreshTasks: fetchTasks };
};