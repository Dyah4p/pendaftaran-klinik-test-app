import React from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <div className="main-content-user">
        <h2>Selamat Datang di Menu User</h2>
        <p>Pilih salah satu ikon untuk masuk ke menu yang diinginkan dan isi data diri anda dimenu profil.</p>
        <div className="option-container">
          <Link to="/UserDashboard" className="option-card">
            <img src="/img/Logo Klinik.png" alt="DashboardUser" />
            <p>Dashboard User</p>
          </Link>
          <Link to="/PilihPoli" className="option-card">
            <img src="/img/gambar catatan.png" alt="Pilih Poli" />
            <p>Pilih Poli</p>
          </Link>
          <Link to="/ProfilUser" className="option-card">
            <img src="/img/gambar tangan.png" alt="Profil" />
            <p>Profil</p>
          </Link>
          <Link to="/UserHistory" className="option-card">
            <img src="/img/History.jpg" alt="History" />
            <p>Histori Pasien</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
