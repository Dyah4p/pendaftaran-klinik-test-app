import React from 'react';
import './KelolaJadwalButton.css'; // Impor CSS spesifik untuk tombol

const KelolaJadwalButton = ({ jadwalEdit, tambahJadwal, updateJadwal }) => {
  return (
    <button className="kelola-jadwal-button" onClick={jadwalEdit ? updateJadwal : tambahJadwal}>
      {jadwalEdit ? 'Update Jadwal' : 'Tambah Jadwal'}
    </button>
  );
};

export default KelolaJadwalButton;
