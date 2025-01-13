import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useUser(); // Ambil user dari context
  const userId = user ? user.user_id : null;

  return (
    <div className="user-dashboard">
      <div className="main-content-user">
        <h2>Selamat Datang di Menu User</h2>
        <p>Pilih salah satu ikon untuk masuk ke menu yang diinginkan dan isi data diri anda di menu profil.</p>
        <div className="option-container">
          <Link to="/UserDashboard" className="option-card">
            <img src="/img/Logo Klinik.png" alt="Logo Klinik untuk Dashboard User" />
            <p>Dashboard User</p>
          </Link>
          <Link to="/PilihPoli" className="option-card">
            <img src="/img/gambar catatan.png" alt="Gambar Catatan untuk Pilih Poli" />
            <p>Pilih Poli</p>
          </Link>
          <Link to="/ProfilUser" className="option-card">
            <img src="/img/gambar tangan.png" alt="Gambar Tangan untuk Profil" />
            <p>Profil</p>
          </Link>
          <Link to={`/UserHistory?user_id=${userId}`} className="option-card">
            <img src="/img/History.jpg" alt="Gambar History untuk Histori Pasien" />
            <p>Histori Pasien</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
