import './App.css'

function App() {
  return (
    <main className="octofit-shell">
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <span className="eyebrow">Fitness Tracking</span>
            <h1 className="display-4 fw-bold mt-3">OctoFit Tracker</h1>
            <p className="lead mt-3 text-muted">
              Track activity, manage teams, and celebrate progress with a simple,
              focused training dashboard.
            </p>
            <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
              <button type="button" className="btn btn-primary btn-lg">
                View activities
              </button>
              <button type="button" className="btn btn-outline-primary btn-lg">
                Leaderboard
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
