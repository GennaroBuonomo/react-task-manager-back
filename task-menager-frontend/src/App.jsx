
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import DefaultLayout from './layouts/DefaultLauout';
import './App.css'


function App() {
  return (
    <BrowserRouter>
     <Routes>
       <Route element={<DefaultLayout />}>
         <Route path="/" element={<TaskList/>}/>
         <Route path="/add" element={<AddTask/>}/>
       </Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App
