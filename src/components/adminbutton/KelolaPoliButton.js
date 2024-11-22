import React from 'react';
import './KelolaPoliButton.css'; // Impor CSS spesifik untuk tombol

const KelolaPoliButton = ({ poliEdit, tambahPoli, updatePoli }) => {
  return (
    <button className="kelola-poli-button" onClick={poliEdit ? updatePoli : tambahPoli}>
      {poliEdit ? 'Update Poli' : 'Tambah Poli'}
    </button>
  );
};

export default KelolaPoliButton;
