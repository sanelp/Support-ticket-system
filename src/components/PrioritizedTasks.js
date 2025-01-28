import React from "react";
import { useNavigate } from "react-router-dom";

function PrioritizedTasks({ tickets }) {
  const navigate = useNavigate();
  const prioritizedTickets = tickets.filter((ticket) => ticket.priority);

  return (
    <div className="prioritized-tasks-container">
      <h4 className="title">Prioriterte Oppgaver</h4>
      <button onClick={() => navigate("/dashboard")} className="button">
        Tilbake til Dashboard
      </button>
      <ul className="ticket-list">
        {prioritizedTickets.map((ticket) => (
          <li key={ticket.id} className="ticket-item">
            <h5>{ticket.title}</h5>
            <p>{ticket.description}</p>
            <p>Status: {ticket.status}</p>
            <p>Eier: {ticket.owner}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PrioritizedTasks;
