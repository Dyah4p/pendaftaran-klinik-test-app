import React from 'react';
import './BackButton.css'; // Impor CSS spesifik untuk tombol kembali

const BackButton = ({ handleBackToDashboard }) => {
  return (
    <button className="back-button" onClick={handleBackToDashboard}>
      Back
    </button>
  );
};

export default BackButton;
