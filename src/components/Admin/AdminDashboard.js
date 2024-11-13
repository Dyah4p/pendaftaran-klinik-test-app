import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <a href="/AdminDashboard">Admin Dashboard</a>
        <a href="/KelolaDokter">Kelola Dokter</a>
        <a href="/KelolaPoli">Kelola Poli</a>
        <a href="/KelolaPasien">Kelola Data Pasien</a>
        <a href="/KelolaJadwal">Kelola Jadwal</a>
        <a href="/RiwayatPasien">Riwayat Pasien</a>
        <a href="/KonfirmasiJanji">Konfirmasi Janji Temu</a>
      </div>
      <div className="main-content">
        <h2>Admin Dashboard</h2>
        <p>Selamat datang di admin dashboard. Silakan pilih menu di sebelah kiri untuk mengelola data.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
