import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './KelolaPasien.css';

const KelolaPasien = () => {
  const [pasien, setPasien] = useState([]);

  useEffect(() => {
    const pasienData = JSON.parse(localStorage.getItem('userProfile')) || [];
    setPasien(Array.isArray(pasienData) ? pasienData : [pasienData]); // Pastikan data pasien adalah array yang diambil dari profil user
    console.log('Data pasien yang diambil di admin:', pasienData);
  }, []);

  const handleDelete = (index) => {
    const newPasien = pasien.filter((_, i) => i !== index);
    setPasien(newPasien);
    localStorage.setItem('userProfile', JSON.stringify(newPasien));
    console.log('Pasien dihapus:', index);
  };

  return (
    <div className="kelola-pasien">
      <div className="sidebar">
        <Link to="/admin-dashboard">Dashboard</Link>
        <Link to="/kelola-dokter">Kelola Dokter</Link>
        <Link to="/kelola-poli">Kelola Poli</Link>
        <Link to="/kelola-pasien">Kelola Data Pasien</Link>
        <Link to="/kelola-jadwal">Kelola Jadwal</Link>
        <Link to="/konfirmasi-janji">Konfirmasi Janji Temu</Link>
        <Link to="/riwayat-pasien">Riwayat Pasien</Link>
      </div>
      <div className="main-content">
        <h2>Kelola Data Pasien</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Tanggal Lahir</th>
              <th>Nomor Telepon</th>
              <th>Email</th>
              <th>Alamat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pasien.map((entry, index) => (
              <tr key={index}>
                <td>{entry.nama}</td>
                <td>{entry.tanggalLahir}</td>
                <td>{entry.nomorTelepon}</td>
                <td>{entry.email}</td>
                <td>{entry.alamat}</td>
                <td><button onClick={() => handleDelete(index)}>Hapus</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KelolaPasien;
