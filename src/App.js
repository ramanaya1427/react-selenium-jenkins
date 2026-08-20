import React, { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("Welcome to the React Selenium Test!");
  };

  return (
    <div className="App">
      <h1>React Selenium Testing</h1>

      <p id="description">
        This application is tested using Selenium WebDriverJS.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
        />

        <button id="submit-button" type="submit">
          Submit
        </button>
      </form>

      {message && <p id="success-message">{message}</p>}
    </div>
  );
}

export default App; 