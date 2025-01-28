import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function TicketDetails({ tickets }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const ticket = tickets.find((ticket) => ticket.id === parseInt(id));

  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  return (
    <div className="ticket-details-container">
      <h4 className="title">Ticket Detaljer</h4>
      <button onClick={() => navigate("/view-tickets")} className="button">
        Tilbake til Tickets
      </button>
      <div className="ticket-details-box">
        <h5>{ticket.title}</h5>
        <p>{ticket.description}</p>
        <p>Status: {ticket.status}</p>
        <p>Eier: {ticket.owner}</p>
        <p>Prioritet: {ticket.priority ? "Ja" : "Nei"}</p>
      </div>
    </div>
  );
}

export default TicketDetails;
