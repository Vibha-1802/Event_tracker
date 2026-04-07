import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
