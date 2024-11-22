import React, { useEffect, useState } from 'react';
import './ProfilUser.css';
import SaveButton from '../../components/pasienbutton/SaveButton'; // Impor komponen tombol simpan
import LogoutButton from '../../components/pasienbutton/LogoutButton'; // Impor komponen tombol logout

const ProfilUser = () => {
  const [user, setUser] = useState({
    nama: '',
    tanggalLahir: '',
    nomorTelepon: '',
    email: '',
    alamat: ''
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userProfile')) || {};
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    alert('Anda telah keluar.');
    window.location.href = '/LoginPage'; // Arahkan ke halaman login setelah logout
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(user));
    alert('Profil berhasil disimpan!');
  };

  return (
    <div className="profil-user">
      <h2>Profil Pengguna</h2>
      <div className="profil-info">
        <label>Nama:</label>
        <input
          type="text"
          name="nama"
          value={user.nama}
          onChange={handleChange}
        />
      </div>
      <div className="profil-info">
        <label>Tanggal Lahir:</label>
        <input
          type="date"
          name="tanggalLahir"
          value={user.tanggalLahir}
          onChange={handleChange}
        />
      </div>
      <div className="profil-info">
        <label>Nomor Telepon:</label>
        <input
          type="text"
          name="nomorTelepon"
          value={user.nomorTelepon}
          onChange={handleChange}
        />
      </div>
      <div className="profil-info">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>
      <div className="profil-info">
        <label>Alamat:</label>
        <input
          type="text"
          name="alamat"
          value={user.alamat}
          onChange={handleChange}
        />
      </div>
      <SaveButton handleSave={handleSave} />
      <LogoutButton handleLogout={handleLogout} />
    </div>
  );
};

export default ProfilUser;
