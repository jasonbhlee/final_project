import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import '../App.css';

function HomePage() {
  return (
    <div className="homepage">
      <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <h1>
          <img src={logo} alt="Logo" style={{ height: '50px', marginRight: '20px' }} />
          loooong wknd
        </h1>
      </header>

      <nav className="navbar">
        <ul>
          <li><Link to="/home">Homepage</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/">Sign Out</Link></li>
        </ul>
      </nav>

      {/* Home Page Content */}
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Welcome to Your Dashboard</h2>
        <p>Select a project to sign up for:</p>
        <Link to="/projects">
          <button>Go to Projects</button>
        </Link>
        <p>Welcome user</p>
      </div>
    </div>
  );
}

export default HomePage;
