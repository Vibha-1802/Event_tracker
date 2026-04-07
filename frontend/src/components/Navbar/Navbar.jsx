import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Lightbulb, BookOpen, LogOut, User, Heart, UserCircle } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
  };

  const links = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/papers', label: 'Papers', icon: FileText },
    { path: '/patents', label: 'Patents', icon: Lightbulb },
    { path: '/fdp', label: 'FDP', icon: BookOpen },
    { path: '/social-service', label: 'Social', icon: Heart },
  ];

  if (user.role === 'Admin') {
    links.push({ path: '/admin', label: 'Admin', icon: User });
  } else {
    // Only Professors have profiles
    links.splice(4, 0, { path: '/profile', label: 'Profile', icon: UserCircle });
  }

  return (
    <nav className="navbar glass-panel">
      <div className="nav-brand">
        <div className="brand-logo">
          <span>ET</span>
        </div>
        <h1 className="brand-text">EventTracker</h1>
      </div>

      <div className="nav-links">
        {links.map((item) => {
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
        <Link to="/" onClick={handleLogout} className="logout-btn">
          <LogOut size={18} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
