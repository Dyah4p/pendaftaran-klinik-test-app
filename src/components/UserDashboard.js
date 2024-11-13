import React from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <div className="sidebar">
        <Link to="/UserDashboard">Dashboard User</Link>
        <Link to="/PilihPoli">Pilih Poli</Link>
        <Link to="/JanjiTemu">Janji Temu</Link>
        <Link to="/ProfilUser">Profil User</Link>
        <Link to="/PilihDokter">Pilih Dokter</Link>
      </div>
      <div className="main-content">
        <h2>Dashboard User</h2>
        <p>Selamat datang di dashboard user. Silakan pilih menu di sebelah kiri untuk mengelola data.</p>
      </div>
    </div>
  );
};

export default UserDashboard;
