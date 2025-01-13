import React, { useState } from 'react';
import './RegisterAdmin.css';

const RegisterAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [created_at, setCreatedAt] = useState(''); // Optional, depending on the backend

  const handleRegister = async () => {
    // Admin role yang diinginkan
    const adminRole = 'admin';
    const adminData = { username, password, created_at, role: adminRole };

    try {
      const response = await fetch('http://localhost:4000/api/users/register', { // Endpoint untuk users
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminData),
      });

      const data = await response.json();
      console.log('Register response:', data);

      if (data.status === 'success') {
        setSuccess('Pendaftaran admin berhasil!');
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
    <div className="register-admin">
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
      <div>
        <label>Created At:</label>
        <input
          type="datetime-local"
          value={created_at}
          onChange={(e) => setCreatedAt(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>Daftar</button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default RegisterAdmin;
