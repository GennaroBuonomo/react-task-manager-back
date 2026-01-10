import { createContext, useState, useEffect, useContext } from "react";

// CREO IL CONTESTO
const GlobalContext = createContext();

// CREO IL PROVIDER
export const GlobalProvider = ({ children }) => {
  console.log("Variabile ENV caricata:", import.meta.env.VITE_API_URL);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {

    const fetchTasks = async () => {
      try {
        const response = await fetch(`${apiUrl}/tasks`);
        const data = await response.json();
        setTasks(data);
        console.log("Dati ricevuti dal server:", data);
      } catch (error) {
        console.error("Errore nel recupero dei task:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [apiUrl]);

  const value = {
    tasks,
    loading,
    refreshTasks: async () => {
      const resp = await fetch(`${apiUrl}/tasks`);
      const data = await resp.json();
      setTasks(data);
    }
  };

return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

// Creo l'Hook personalizzato
// Questo mi permette di usare i dati ovunque con una sola riga
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext deve essere usato dentro un GlobalProvider");
  }
  return context;
};
