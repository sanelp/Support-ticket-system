import React from "react";
import { useNavigate } from "react-router-dom";

function OldTickets({ tickets }) {
  const navigate = useNavigate();
  const oldTickets = tickets.filter((ticket) => ticket.status === "Closed");

  return (
    <div className="old-tickets-container">
      <h4 className="title">Gamle Tickets</h4>
      <button onClick={() => navigate("/dashboard")} className="button">
        Tilbake til Dashboard
      </button>
      <ul className="ticket-list">
        {oldTickets.map((ticket) => (
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

export default OldTickets;
