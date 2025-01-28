import React from "react";
import { useNavigate } from "react-router-dom";

function ViewTickets({ user, tickets }) {
  const navigate = useNavigate();
  const filteredTickets =
    user.role === "admin"
      ? tickets
      : tickets.filter((ticket) => ticket.owner === user.email);

  return (
    <div className="view-tickets-container">
      <h4 className="title">Se Tickets</h4>
      <ul className="ticket-list">
        {filteredTickets.map((ticket) => (
          <li key={ticket.id} className="ticket-item">
            <h5>{ticket.title}</h5>
            <p>{ticket.description}</p>
            <p>Status: {ticket.status}</p>
            <button
              onClick={() => navigate(`/ticket-details/${ticket.id}`)}
              className="button"
            >
              Vis Detaljer
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/dashboard")} className="button">
        Tilbake til Dashboard
      </button>
    </div>
  );
}

export default ViewTickets;
