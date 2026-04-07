import './Card.css';

const Card = ({ title, value, icon: Icon, color, delay }) => {
  return (
    <div className={`stat-card glass-panel animate-fade-in ${delay ? 'delay-' + delay : ''}`}>
      <div className="stat-icon" style={{ background: `hsla(${color}, 80%, 60%, 0.1)`, color: `hsl(${color}, 80%, 65%)` }}>
        {Icon && <Icon size={24} />}
      </div>
      <div className="stat-info">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default Card;
