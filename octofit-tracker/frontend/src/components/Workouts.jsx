import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const response = await fetch(`${API_BASE}/api/workouts/`);
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        const data = await response.json();
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      }
    }

    fetchWorkouts();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h3 mb-3">Workouts</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <div className="list-group">
          {workouts.map((workout) => (
            <div key={workout._id || workout.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{workout.title}</strong>
                  <div className="text-muted">{workout.type} • {workout.difficulty}</div>
                </div>
                <span className="badge bg-secondary-subtle text-secondary">
                  {workout.durationMinutes} min
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Workouts;
