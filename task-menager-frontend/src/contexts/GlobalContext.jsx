import { createContext, useContext } from "react";
import { useTasks } from "../hooks/useTasks"

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // Ora "taskData" contiene tutto: tasks, loading, addTask, ecc.
  const taskData = useTasks();

  return (
    <GlobalContext.Provider value={taskData}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext deve essere usato dentro un GlobalProvider");
  }
  return context;
};