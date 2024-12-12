import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../logo.png';
import '../App.css';

// this tracks the input of user's name, email, password and allows navigation to other routes.
function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  // this handles form submission for registration
  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      userFirstName: name,
      email: email,
      password: password,
    };

    try {
      // this sends user registration data to the backend
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      alert('Registration successful!');
      // this redirects to the sign-in page
      history.push('/');
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <div className="register-page">
      {/* Navbar with no content */}
      <nav className="navbar"></nav>

      <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <h1>
          <img src={logo} alt="Logo" style={{ height: '100px', marginRight: '20px' }} />
          loooong wknd
        </h1>
      </header>

      <h2>Register</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          textAlign: 'left',
          display: 'inline-block',
          maxWidth: '300px',
          width: '100%',
        }}
      >
        {/* inline - input fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '5px' }}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                padding: '8px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '100%',
              }}
            />
          </div>

          {/* email input */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '5px' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: '8px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '100%',
              }}
            />
          </div>

          {/* password */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '5px' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: '8px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '100%',
              }}
            />
          </div>

          {/* submit button */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button
              type="submit"
              style={{
                padding: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                backgroundColor: '#6a5acd',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                width: '150px',
              }}
            >
              Register
            </button>
          </div>
        </div>
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/" style={{ textDecoration: 'none', color: '#6a5acd' }}>
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
