// src/pages/Pasien/RegisterUser.js
import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext'; // Import useUser untuk mengakses context
import '../Pasien/RegisterUser.css';

const RegisterUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [created_at, setCreatedAt] = useState(''); // Pastikan tanggal dibuat disesuaikan dengan backend
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { setUser } = useUser(); // Ambil setUser dari context untuk memperbarui informasi user

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, created_at }),
      });

      const data = await response.json();
      console.log('Register response:', data);

      if (data.status === 'success') {
        // Setelah pendaftaran berhasil, perbarui context dengan data pengguna baru
        setUser({
          user_id: data.user_id,  // Ambil user_id dari response
          username: data.username,
          created_at: data.created_at,
          // Tambahkan data lainnya sesuai kebutuhan
        });

        setSuccess('Pendaftaran berhasil!');
        setError('');
        setUsername('');
        setPassword('');
        setCreatedAt('');
      } else {
        setSuccess('');
        setError(data.message || 'Gagal mendaftar');
      }
    } catch (error) {
      setSuccess('');
      setError(`Error mendaftar: ${error.message}`);
    }
  };

  return (
    <div className="register-user">
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
      <div>
        <label>Created At:</label>
        <input
          type="datetime-local"
          value={created_at}
          onChange={(e) => setCreatedAt(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>Daftar</button>
      {error && <p className="error">{error}</p>} {/* Menampilkan pesan error */}
      {success && <p className="success">{success}</p>} {/* Menampilkan pesan sukses */}
    </div>
  );
};

export default RegisterUser;
