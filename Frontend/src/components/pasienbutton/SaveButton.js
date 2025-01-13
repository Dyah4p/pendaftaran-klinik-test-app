import React from 'react';
import './SaveButton.css'; // Impor CSS spesifik untuk tombol simpan

const SaveButton = ({ handleSave }) => {
  return (
    <button onClick={handleSave} className="save-button">
      Simpan
    </button>
  );
};

export default SaveButton;
