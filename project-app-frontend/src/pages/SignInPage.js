import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../logo.png';
import '../App.css';

function SignInPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Sign-in failed');
      }

      // Store the email in localStorage to persist user session data
      localStorage.setItem('userEmail', formData.email);

      // Navigate to the home page after successful sign-in
      history.push('/home');
    } catch (error) {
      alert('Sign-in failed: ' + error.message);
    }
  };

  return (
    <div className="signin-page" style={{ textAlign: 'center' }}>
      <header>
        <h1>
          <img src={logo} alt="Logo" className="logo" />
          loooong wknd
        </h1>
      </header>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="button-primary">
          Sign In
        </button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/register" className="link-primary">
          Register
        </Link>
      </p>
    </div>
  );
}

export default SignInPage;
