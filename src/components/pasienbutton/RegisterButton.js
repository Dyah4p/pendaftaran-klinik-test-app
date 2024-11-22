import React from 'react';
import './RegisterButton.css'; // Impor CSS spesifik untuk tombol

const RegisterButton = ({ handleRegister }) => {
  return (
    <button onClick={handleRegister}>
      Daftar
    </button>
  );
};

export default RegisterButton;
