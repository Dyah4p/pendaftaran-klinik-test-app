import React from 'react';
import './ConfirmButton.css'; // Impor CSS spesifik untuk tombol konfirmasi

const ConfirmButton = ({ handleConfirm }) => {
  return (
    <button type="button" className="confirm-button" onClick={handleConfirm}>
      Apakah Data Sudah Benar?
    </button>
  );
};

export default ConfirmButton;
