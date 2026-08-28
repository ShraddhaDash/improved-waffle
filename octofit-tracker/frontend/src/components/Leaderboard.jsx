import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch(`${API_BASE}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        const data = await response.json();
        setLeaderboard(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h3 mb-3">Leaderboard</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <div className="list-group">
          {leaderboard.map((entry, index) => (
            <div key={entry.userId || entry._id || index} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>#{index + 1} {entry.displayName || entry.username}</strong>
                  <div className="text-muted">{entry.activities || 0} activities</div>
                </div>
                <span className="badge bg-warning-subtle text-warning">{entry.points || 0} pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Leaderboard;
