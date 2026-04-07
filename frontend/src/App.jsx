import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Papers from './pages/Papers/Papers';
import Patents from './pages/Patents/Patents';
import Fdp from './pages/FDP/Fdp';
import Admin from './pages/Admin/Admin';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/papers" element={<Papers />} />
          <Route path="/patents" element={<Patents />} />
          <Route path="/fdp" element={<Fdp />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
