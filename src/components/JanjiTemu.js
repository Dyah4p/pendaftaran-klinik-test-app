import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JanjiTemu.css';

const JanjiTemu = () => {
  const [nama, setNama] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [email, setEmail] = useState('');
  const [tanggalJanjiTemu, setTanggalJanjiTemu] = useState('');
  const [waktuJanjiTemu, setWaktuJanjiTemu] = useState('');
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Simpan data konfirmasi ke database atau local storage
    const janjiTemu = {
      nama,
      tanggalLahir,
      nomorTelepon,
      email,
      tanggalJanjiTemu,
      waktuJanjiTemu,
    };
    // Simpan ke local storage
    localStorage.setItem('janjiTemu', JSON.stringify(janjiTemu));
    alert('Janji temu berhasil dikonfirmasi!');
    navigate('/UserDashboard');
  };

  const handleBackToDashboard = () => {
    navigate('/UserDashboard');
  };

  return (
    <div className="janji-temu">
      <h2>Konfirmasi Janji Temu</h2>
      <form>
        <label>Nama:</label>
        <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} required />
        <label>Tanggal Lahir:</label>
        <input type="date" value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} required />
        <label>Nomor Telepon:</label>
        <input type="tel" value={nomorTelepon} onChange={(e) => setNomorTelepon(e.target.value)} required />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Tanggal Janji Temu:</label>
        <input type="date" value={tanggalJanjiTemu} onChange={(e) => setTanggalJanjiTemu(e.target.value)} required />
        <label>Waktu Janji Temu:</label>
        <input type="time" value={waktuJanjiTemu} onChange={(e) => setWaktuJanjiTemu(e.target.value)} required />
        <button type="button" className="confirm-button" onClick={handleConfirm}>Apakah Data Sudah Benar?</button>
      </form>
      <button className="back-button" onClick={handleBackToDashboard}>Back</button>
    </div>
  );
};

export default JanjiTemu;
