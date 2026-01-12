import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './contexts/GlobalContext';
import TaskList from './pages/TaskList';
import TaskDetail from "./pages/TaskDetail";
import AddTask from './pages/AddTask';
import DefaultLayout from './layouts/DefaultLauout';
import './App.css'


function App() {
  return (
    <GlobalProvider>
     <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<TaskList/>}/>
          <Route path="/add" element={<AddTask/>}/>
          <Route path="/task/:id" element={<TaskDetail/>}/>
        </Route>
      </Routes>
     </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
