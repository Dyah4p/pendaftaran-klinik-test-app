import React from 'react';
import './KelolaPasienButton.css'; // Impor CSS spesifik untuk tombol

const KelolaPasienButton = ({ pasienEdit, tambahPasien, updatePasien }) => {
  return (
    <button onClick={pasienEdit ? updatePasien : tambahPasien} className="kelola-pasien-button">
      {pasienEdit ? 'Update Pasien' : 'Tambah Pasien'}
    </button>
  );
};

export default KelolaPasienButton;
