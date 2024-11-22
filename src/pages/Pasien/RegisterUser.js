import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterUser.css';
import RegisterButton from '../../components/pasienbutton/RegisterButton'; // Impor komponen tombol

const RegisterUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // Simpan data user ke local storage
    localStorage.setItem('userUsername', username);
    localStorage.setItem('userPassword', password);
    alert('Pendaftaran user berhasil!');
    navigate('/LoginPage'); // Arahkan ke halaman login setelah pendaftaran berhasil
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Daftar User</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <RegisterButton handleRegister={handleRegister} />
      </div>
    </div>
  );
};

export default RegisterUser;
