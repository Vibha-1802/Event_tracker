import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Lightbulb, BookOpen, LogOut, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/papers', label: 'Papers', icon: FileText },
    { path: '/patents', label: 'Patents', icon: Lightbulb },
    { path: '/fdp', label: 'FDP', icon: BookOpen },
    { path: '/admin', label: 'Admin', icon: User },
  ];

  return (
    <nav className="navbar glass-panel">
      <div className="nav-brand">
        <div className="brand-logo">
          <span>ET</span>
        </div>
        <h1 className="brand-text">EventTracker</h1>
      </div>

      <div className="nav-links">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="nav-end">
        <Link to="/" className="logout-btn">
          <LogOut size={18} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
