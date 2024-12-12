import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProjectsPage() {
  const [signedUpProjects, setSignedUpProjects] = useState([]);
  const userEmail = localStorage.getItem('userEmail'); // Get email from localStorage

  // Fetch signed-up projects on component load
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/users/projects?email=${userEmail}`);
        const data = await response.json();

        if (response.ok) {
          setSignedUpProjects(data.projects || []); // Set state with fetched projects
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
        setSignedUpProjects(updatedProjects); // Update frontend state
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
        setSignedUpProjects(updatedProjects); // Update frontend state
        alert(`You have removed Project ${project}`);
      } else {
        console.error('Failed to remove project');
      }
    } catch (err) {
      console.error('Error removing project:', err);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={{ backgroundColor: '#333', padding: '10px', color: '#fff' }}>
        <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around', padding: 0 }}>
          <li><Link to="/" style={{ color: '#fff' }}>Sign Out</Link></li>
          <li><Link to="/projects" style={{ color: '#fff' }}>Projects</Link></li>
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
