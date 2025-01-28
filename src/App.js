import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import SupportTickets from "./components/SupportTickets";
import Statistics from "./components/Statistics";
import PrioritizedTasks from "./components/PrioritizedTasks";
import CreateTicket from "./components/CreateTicket";
import ViewTickets from "./components/ViewTickets";
import Dashboard from "./components/Dashboard";
import OldTickets from "./components/OldTickets";
import TicketDetails from "./components/TicketDetails";

const users = [
  { email: "it@test.com", password: "ittest", role: "admin" },
  { email: "ansatt@test.com", password: "ansatt", role: "user" },
];

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      onLogin(user);
      navigate("/dashboard");
    } else {
      setError("Ugyldig e-post eller passord");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h4 className="title">Logg inn</h4>
        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Passord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleLogin} className="button">
          Logg inn
        </button>
        <div className="user-info">
          <h5>Tilgjengelige brukere:</h5>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                <strong>E-post:</strong> {user.email} <br />
                <strong>Passord:</strong> {user.password}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);

  const addTicket = (ticket) => {
    setTickets([...tickets, ticket]);
  };

  const closeTicket = (ticketId) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: "Closed" } : ticket
      )
    );
  };

  const prioritizeTicket = (ticketId) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, priority: true } : ticket
      )
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} onLogout={() => setUser(null)} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/create-ticket"
          element={
            user ? (
              <CreateTicket user={user} addTicket={addTicket} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/view-tickets"
          element={
            user ? (
              <ViewTickets user={user} tickets={tickets} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/support-tickets"
          element={
            user && user.role === "admin" ? (
              <SupportTickets
                tickets={tickets}
                closeTicket={closeTicket}
                prioritizeTicket={prioritizeTicket}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/statistics"
          element={
            user && user.role === "admin" ? (
              <Statistics tickets={tickets} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/prioritized-tasks"
          element={
            user && user.role === "admin" ? (
              <PrioritizedTasks tickets={tickets} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/old-tickets"
          element={
            user ? <OldTickets tickets={tickets} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/ticket-details/:id"
          element={
            user ? (
              <TicketDetails tickets={tickets} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
