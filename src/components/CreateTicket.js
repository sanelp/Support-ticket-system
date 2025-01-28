import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTicket({ user, addTicket }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateTicket = () => {
    if (!title.trim() || !description.trim()) {
      setError("Både tittel og beskrivelse er påkrevd");
      return;
    }

    const newTicket = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      status: "Åpen",
      owner: user.email,
      priority: user.role === "admin" ? priority : false,
    };

    addTicket(newTicket);
    navigate("/view-tickets");
  };

  return (
    <div className="create-ticket-container">
      <div className="create-ticket-box">
        <h4 className="title">Opprett Ticket</h4>
        <input
          type="text"
          placeholder="Tittel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        <textarea
          placeholder="Beskrivelse"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />
        {user.role === "admin" && (
          <label>
            <input
              type="checkbox"
              checked={priority}
              onChange={(e) => setPriority(e.target.checked)}
            />
            Prioritert
          </label>
        )}
        {error && <p className="error">{error}</p>}
        <button onClick={handleCreateTicket} className="button">
          Opprett Ticket
        </button>
      </div>
      <button onClick={() => navigate("/dashboard")} className="button">
        Tilbake til Dashboard
      </button>
    </div>
  );
}

export default CreateTicket;
