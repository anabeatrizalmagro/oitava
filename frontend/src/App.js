// frontend/src/App.js (React)
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import ContactUs from "./pages/ContactUs";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import FormationPage from "./pages/FormationPage";
import FestivalsPage from "./pages/FestivalsPage";

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [emails, setEmails] = useState([]);

  const handleSubscribe = async () => {
    try {
      const response = await axios.post("http://localhost:8000/subscribe", {
        email,
      });
      setMessage(response.data.message);
      setError("");
      setEmail("");
      fetchEmails();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError("An error occurred.");
      }
      setMessage("");
    }
  };

  const fetchEmails = async () => {
    try {
      const response = await axios.get("http://localhost:8000/emails");
      setEmails(response.data.emails);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  React.useEffect(() => {
    fetchEmails();
  }, []);

  // return (
  //   <div style={{ textAlign: "center", padding: "20px" }}>
  //     <h1>Newsletter Subscription</h1>
  //     {message && <p style={{ color: "green" }}>{message}</p>}
  //     {error && <p style={{ color: "red" }}>{error}</p>}
  //     <input
  //       type="email"
  //       placeholder="Enter your email"
  //       value={email}
  //       onChange={(e) => setEmail(e.target.value)}
  //     />
  //     <button onClick={handleSubscribe}>Subscribe</button>

  //     <h2>Subscribed Emails:</h2>
  //     <ul>
  //       {emails.map((email, index) => (
  //         <li key={index}>{email}</li>
  //       ))}
  //     </ul>
  //   </div>
  // );
  return (
    <Router>
      <div
        class="cover-container d-flex w-100  p-3 mx-auto flex-column"
        style={{ backgroundColor: "#AE70AF" }}
      >
        <header class="mb-auto">
          <nav class="nav nav-masthead ">
            <div class="" style={{ marginLeft: "100px", marginRight: "780px" }}>
              <img src="logo.png" alt="logo" height={200} width={200} />
            </div>
            <Link
              to="/"
              class="nav-link fw-bold fs-4 px-0 py-0 text-white"
              aria-current="page"
              style={{ marginRight: 20, marginTop: 100 }}
            >
              Home
            </Link>
            <Link
              to="/historia"
              class="nav-link fw-bold fs-4 px-0 py-0 text-white"
              style={{ marginRight: 20, marginTop: 100 }}
            >
              História
            </Link>
            <Link
              to="/formacao"
              class="nav-link fw-bold fs-4 px-0 py-0 text-white"
              style={{ marginRight: 20, marginTop: 100 }}
            >
              Cursos
            </Link>
            <Link
              to="/festivals"
              class="nav-link fw-bold fs-4 px-0 py-0 text-white"
              style={{ marginRight: 20, marginTop: 100 }}
            >
              Festivais
            </Link>
            <Link
              to="/contato"
              class="nav-link fw-bold fs-4 px-0 py-0 text-white"
              style={{ marginRight: 20, marginTop: 100 }}
            >
              Contatos
            </Link>
          </nav>
        </header>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/formacao" element={<FormationPage />} />
        <Route path="/contato" element={<ContactUs />} />
        <Route path="/festivais" element={<FestivalsPage />} />
        <Route path="/historia" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
