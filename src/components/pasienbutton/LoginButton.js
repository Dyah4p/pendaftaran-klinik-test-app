import React from 'react';
import './LoginButton.css'; // Impor CSS spesifik untuk tombol login

const LoginButton = ({ handleLogin }) => {
  return (
    <button onClick={handleLogin}>
      Login
    </button>
  );
};

export default LoginButton;
