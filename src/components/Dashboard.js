import React from "react";
import { Link } from "react-router-dom";

function Dashboard({ user, onLogout }) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h4 className="title">IT Support Dashboard</h4>
        <button onClick={onLogout} className="button">
          Logg ut
        </button>
      </div>
      <div className="grid">
        {user.role === "admin" && (
          <>
            <Link to="/support-tickets" className="grid-item">
              <div className="dashboard-box">
                <h5>Support Tickets</h5>
              </div>
            </Link>
            <Link to="/statistics" className="grid-item">
              <div className="dashboard-box">
                <h5>Statistikk</h5>
              </div>
            </Link>
            <Link to="/prioritized-tasks" className="grid-item">
              <div className="dashboard-box">
                <h5>Prioriterte Oppgaver</h5>
              </div>
            </Link>
          </>
        )}
        <Link to="/create-ticket" className="grid-item">
          <div className="dashboard-box">
            <h5>Opprett Ticket</h5>
          </div>
        </Link>
        <Link to="/view-tickets" className="grid-item">
          <div className="dashboard-box">
            <h5>Se Tickets</h5>
          </div>
        </Link>
        <Link to="/old-tickets" className="grid-item">
          <div className="dashboard-box">
            <h5>Gamle Tickets</h5>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
