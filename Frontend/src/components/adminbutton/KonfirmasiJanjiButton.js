import React from 'react';
import './KonfirmasiJanjiButton..css'; // Impor CSS spesifik untuk tombol

const KonfirmasiJanjiButton = ({ janjiEdit, tambahJanji, updateJanji }) => {
  return (
    <button className="konfirmasi-janji-button" onClick={janjiEdit ? updateJanji : tambahJanji}>
      {janjiEdit ? 'Update Janji' : 'Tambah Janji'}
    </button>
  );
};

export default KonfirmasiJanjiButton;
