import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterAdmin.css';

const RegisterAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // Simpan data admin ke local storage
    localStorage.setItem('adminUsername', username);
    localStorage.setItem('adminPassword', password);
    alert('Pendaftaran admin berhasil!');
    navigate('/LoginPage'); // Arahkan ke halaman login setelah pendaftaran berhasil
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Daftar Admin</h2>
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
        <button onClick={handleRegister}>Daftar</button>
      </div>
    </div>
  );
};

export default RegisterAdmin;
