import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import '../App.css';

function ProjectsPage() {
  const [signedUpProjects, setSignedUpProjects] = useState([]);
  const userEmail = localStorage.getItem('userEmail');

  // Fetch signed-up projects on component load
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/users/projects?email=${userEmail}`);
        const data = await response.json();

        if (response.ok) {
          setSignedUpProjects(data.projects || []);
        } else {
          console.error('Failed to fetch projects');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, [userEmail]);

  // Handle signing up for a project
  const handleSignUp = async (project) => {
    if (signedUpProjects.includes(project)) {
      alert(`You are already signed up for Project ${project}`);
      return;
    }

    const updatedProjects = [...signedUpProjects, project];

    try {
      const response = await fetch('/api/users/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, projects: updatedProjects }),
      });

      if (response.ok) {
        setSignedUpProjects(updatedProjects);
        alert(`You signed up for Project ${project}`);
      } else {
        console.error('Failed to sign up for project');
      }
    } catch (err) {
      console.error('Error signing up for project:', err);
    }
  };

  // Handle deleting a project
  const handleDelete = async (project) => {
    const updatedProjects = signedUpProjects.filter((p) => p !== project);

    try {
      const response = await fetch('/api/users/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, projects: updatedProjects }),
      });

      if (response.ok) {
        setSignedUpProjects(updatedProjects);
        alert(`You have removed Project ${project}`);
      } else {
        console.error('Failed to remove project');
      }
    } catch (err) {
      console.error('Error removing project:', err);
    }
  };

  return (
    <div className="projects-page">
      <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <h1>
          <img src={logo} alt="Logo" style={{ height: '50px', marginRight: '20px' }} />
          loooong wknd
        </h1>
      </header>

      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/home">Homepage</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/">Sign Out</Link></li>
        </ul>
      </nav>

      {/* Projects Page Content */}
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Projects</h2>
        <p>Select a project to sign up for:</p>

        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => handleSignUp('A')} style={{ padding: '10px 20px', marginRight: '10px' }}>
            Sign Up for Project A
          </button>
          <button onClick={() => handleSignUp('B')} style={{ padding: '10px 20px' }}>
            Sign Up for Project B
          </button>
        </div>

        <h3>Your Signed-Up Projects:</h3>
        {signedUpProjects.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {signedUpProjects.map((project) => (
              <li key={project}>
                Project {project}
                <button onClick={() => handleDelete(project)} style={{ marginLeft: '10px' }}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects signed up yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;
