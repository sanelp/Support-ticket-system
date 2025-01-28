import React from "react";
import { useNavigate } from "react-router-dom";

function SupportTickets({ tickets, closeTicket, prioritizeTicket }) {
  const navigate = useNavigate();

  return (
    <div className="support-tickets-container">
      <h4 className="title">Support Tickets</h4>
      <ul className="ticket-list">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="ticket-item">
            <h5>{ticket.title}</h5>
            <p>{ticket.description}</p>
            <p>Status: {ticket.status}</p>
            <p>Eier: {ticket.owner}</p>
            {ticket.status !== "Closed" && (
              <>
                <button
                  onClick={() => closeTicket(ticket.id)}
                  className="button"
                >
                  Avslutt Ticket
                </button>
                {!ticket.priority && (
                  <button
                    onClick={() => prioritizeTicket(ticket.id)}
                    className="button"
                  >
                    Prioriter Ticket
                  </button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/dashboard")} className="button">
        Tilbake til Dashboard
      </button>
    </div>
  );
}

export default SupportTickets;
