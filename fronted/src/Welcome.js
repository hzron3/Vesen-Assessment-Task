import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"; // Import CSS file

const Welcome = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout actions here (e.g., clear local storage, redirect to login page)
    // For demonstration purposes, simply navigate to the login page
    navigate("/");
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h2 className="welcome-heading">Welcome</h2>
        <p className="welcome-message">
          Welcome! You are logged in as a regular user.
        </p>
        <div className="welcome-info">
          <p>Here are some features available to you:</p>
          <ul>
            <li>View your profile</li>
            <li>Update your settings</li>
            <li>Access exclusive content</li>
          </ul>
        </div>
        {/* Log Out button */}
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Welcome;
