import React from "react";
import { useNavigate } from "react-router-dom";

function Statistics({ tickets }) {
  const navigate = useNavigate();

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Åpen"
  ).length;
  const closedTickets = tickets.filter(
    (ticket) => ticket.status === "Closed"
  ).length;
  const ticketsByUser = tickets.reduce((acc, ticket) => {
    acc[ticket.owner] = (acc[ticket.owner] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="statistics-container">
      <h4 className="title">Statistikk</h4>
      <button onClick={() => navigate("/dashboard")} className="button">
        Tilbake til Dashboard
      </button>
      <div className="statistics-box">
        <p>
          <strong>Totalt antall billetter:</strong> {totalTickets}
        </p>
        <p>
          <strong>Åpne billetter:</strong> {openTickets}
        </p>
        <p>
          <strong>Lukkede billetter:</strong> {closedTickets}
        </p>
        <h5>Billetter per bruker:</h5>
        <ul>
          {Object.entries(ticketsByUser).map(([user, count]) => (
            <li key={user}>
              <strong>{user}:</strong> {count} billetter
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Statistics;
