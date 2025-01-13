import React from 'react';
import './KelolaDokterButton.css'; // Impor CSS spesifik untuk tombol

const KelolaDokterButton = ({ dokterEdit, tambahDokter, updateDokter }) => {
  return (
    <button className="kelola-dokter-button" onClick={dokterEdit ? updateDokter : tambahDokter}>
      {dokterEdit ? 'Update Dokter' : 'Tambah Dokter'}
    </button>
  );
};

export default KelolaDokterButton;
