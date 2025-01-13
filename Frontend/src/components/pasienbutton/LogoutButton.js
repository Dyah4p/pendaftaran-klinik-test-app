import React from 'react';
import './LogoutButton.css'; // Impor CSS spesifik untuk tombol logout

const LogoutButton = ({ handleLogout }) => {
  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
