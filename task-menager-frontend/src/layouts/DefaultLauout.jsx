import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './DefaultLayout.css';

function DefaultLayout() {
  return (
    <div className="layout-wrapper">
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="main-footer">
        Le Task Avanzate - 2026
      </footer>
    </div>
  )
}

export default DefaultLayout;