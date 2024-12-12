import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../logo.png';
import '../App.css';

function SignInPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  // allows navigation between pages
  const history = useHistory();

  // this handles input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // this handles the form submission for signing in
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // this sends email and password to the backend
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Sign-in failed');
      }

      localStorage.setItem('userEmail', formData.email);

      history.push('/home');
    } catch (error) {
      alert('Sign-in failed: ' + error.message);
    }
  };

  // this deletes user accounts 
  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch('/api/users/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // include email and password for authentication
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Account deletion failed');
      }

      // this will clear local storage, notify the user and redirect back to the sign-in page.
      localStorage.removeItem('userEmail');
      alert('Account deleted successfully.');
      history.push('/');
    } catch (error) {
      alert('Account deletion failed: ' + error.message);
    }
  };

  return (
    <div className="signin-page" style={{ textAlign: 'center' }}>
      {/* inline - header section */}
      <header>
        <h1>
          <img src={logo} alt="Logo" style={{ height: '100px', marginRight: '20px' }} />
          loooong wknd
        </h1>
      </header>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} style={{ width: '300px', margin: '0 auto' }}>
        <div className="input-group" style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div className="input-group" style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* sign-in button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
          <button
            type="submit"
            style={{
              width: '48%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              backgroundColor: '#6a5acd',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>

          {/* delete user account button */}
          <button
            type="button"
            onClick={handleDeleteAccount}
            style={{
              width: '48%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Delete Account
          </button>
        </div>
      </form>
      <p style={{ marginTop: '20px' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ textDecoration: 'none', color: '#6a5acd', fontWeight: 'bold' }}>
          Register
        </Link>
      </p>
    </div>
  );
}

export default SignInPage;
