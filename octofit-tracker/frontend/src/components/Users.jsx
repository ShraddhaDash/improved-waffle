import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`${API_BASE}/api/users/`);
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      }
    }

    fetchUsers();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h3 mb-3">Users</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <div className="list-group">
          {users.map((user) => (
            <div key={user._id || user.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{user.displayName || user.username}</strong>
                  <div className="text-muted">@{user.username}</div>
                </div>
                <span className="badge bg-primary-subtle text-primary">{user.email}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Users;
