import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {

const [repos, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('projects', {
      title: `repository`,
    });

    setProjects([...repos, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/projects/${id}`);
    
    const newRepo = repos.filter(repo => repo.id !== id);

    setProjects(newRepo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => 
            <li key={repo.id} >
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;