import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch(`${API_BASE}/api/activities/`);
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        const data = await response.json();
        setActivities(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      }
    }

    fetchActivities();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h3 mb-3">Activities</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <div className="list-group">
          {activities.map((activity) => (
            <div key={activity._id || activity.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{activity.type}</strong>
                  <div className="text-muted">
                    {activity.user?.displayName || activity.user?.username || 'Unknown user'}
                  </div>
                </div>
                <span className="badge bg-success-subtle text-success">
                  {activity.durationMinutes} min
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Activities;
