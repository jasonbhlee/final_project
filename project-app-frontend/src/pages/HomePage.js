import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png'; 
function HomePage() {
  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <h1>
          <img
    src={logo}
    alt="Logo"
    style={{ height: '50px', marginRight: '20px' }}/>Example here</h1></header>
      {/* Navbar */}
      <nav style={{ backgroundColor: '#333', padding: '10px', color: '#fff' }}>
      
        <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around', padding: 0 }}>
          <li><Link to="/home" style={{ color: '#fff' }}>Homepage</Link></li>
                    <li><Link to="/projects" style={{ color: '#fff' }}>Projects</Link></li>
                    <li><Link to="/" style={{ color: '#fff' }}>Sign Out</Link></li>
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
// hompage export
export default HomePage;
//comment example 2