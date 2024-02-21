import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, 'projects');
    onValue(dbRef, (snapshot) => {
      setProjects(Object.keys(snapshot.val() || {}));
    });
  }, []);

  const filteredProjects = projects.filter(project => project.includes(search));

  return (
    <div>
      <header>
        <div className='menu-bar'>
          <h2>Dashboard</h2>
          <div>
            <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search projects...' />
          </div>
        </div>
      </header>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredProjects.map((project) => (
          <div key={project} style={{ border: '1px solid black', borderRadius: '10px', margin: '10px', padding: '10px' }}>
            <h3>{project}</h3>
            <a href={`/?id=${project}`} target="_blank" rel="noopener noreferrer">Open Project</a>
          </div>
        ))}
      </div>
    </div>
  );
}
