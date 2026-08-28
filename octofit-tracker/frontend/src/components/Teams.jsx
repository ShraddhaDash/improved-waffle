import { useEffect, useState } from 'react';

const API_BASE = (() => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
})();

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch(`${API_BASE}/api/teams/`);
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        const data = await response.json();
        setTeams(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      }
    }

    fetchTeams();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h3 mb-3">Teams</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <div className="list-group">
          {teams.map((team) => (
            <div key={team._id || team.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{team.name}</strong>
                  <div className="text-muted">{team.description || 'No description'}</div>
                </div>
                <span className="badge bg-info-subtle text-info">
                  {team.members?.length || 0} members
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Teams;
