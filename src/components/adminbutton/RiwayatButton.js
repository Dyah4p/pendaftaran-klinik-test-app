import React from 'react';
import './RiwayatButton.css'; // Impor CSS spesifik untuk tombol

const RiwayatButton = ({ riwayatEdit, tambahRiwayat, updateRiwayat }) => {
  return (
    <button className="riwayat-button" onClick={riwayatEdit ? updateRiwayat : tambahRiwayat}>
      {riwayatEdit ? 'Update Riwayat' : 'Tambah Riwayat'}
    </button>
  );
};

export default RiwayatButton;
