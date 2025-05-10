import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-link">Book Appointment</Link>
        <Link to="/admin-login" className="nav-link">Admin Login</Link>
      </div>
      <div className="clock">{formattedTime}</div>
    </nav>
  );
};

export default Navbar;
