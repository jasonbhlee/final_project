import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

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
      console.error('Error during sign-in:', error);
      alert('Sign-in failed: ' + error.message);
    }
  };

  //script to trigger delete request when button is clicked
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
        body: JSON.stringify({
          email: formData.email,
          password: formData.password, // Include password for authentication
        }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result?.message || 'Account deletion failed');
      }
  
      // Clear user session data
      localStorage.removeItem('userEmail');
  
      // Clear the form fields
      setFormData({ email: '', password: '' });
  
      // Redirect to the sign-in page
      alert('Account deleted successfully.');
      history.push('/'); // Redirect to sign-in page (adjust route as needed)
    } catch (error) {
      console.error('Error during account deletion:', error);
      alert('Account deletion failed: ' + error.message);
    }
  };
   
  
  

  return (
    <div style={{ textAlign: 'center' }}>
      
      <nav style={{ backgroundColor: '#333', padding: '10px', color: '#fff', height: '74px' }}></nav>






      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <button type="submit">Sign In</button>
        
        <button type="button" onClick={handleDeleteAccount} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
          Delete Account
        </button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/register" style={{ display: 'inline-block', textDecoration: 'none' }}>
          Register
        </Link>
      </p>
    </div>
  );
}

export default SignInPage;
