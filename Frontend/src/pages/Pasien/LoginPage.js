import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext'; // Import UserContext
import '../Pasien/LoginPage.css';
import LoginButton from '../../components/pasienbutton/LoginButton'; // Impor komponen tombol login

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser(); // Ambil fungsi setUser dari context

  // Handle login process
  const handleLogin = async () => {
    setError(''); // Reset error sebelum login

    // Validasi input
    if (!username || !password) {
      setError('Username dan password harus diisi!');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }), // Mengambil data dari input
      });

      if (!response.ok) { // Mengecek apakah response berhasil
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Response from server:', data); // Debugging untuk response

      if (data.status === 'success' && data.user) {
        console.log('Login berhasil:', data.user);

        // Simpan data user ke context dan localStorage
        setUser(data.user); // Set user di context (user_id akan tersimpan di sini)
        localStorage.setItem('user', JSON.stringify(data.user)); // Simpan user di localStorage

        // Redirect sesuai role user
        if (data.user.role === 'admin') {
          navigate('/AdminDashboard');
        } else {
          navigate('/UserDashboard');
        }
      } else {
        setError(data.message || 'Username atau password salah');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Terjadi kesalahan saat login. Silakan coba lagi.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>LOGIN USER</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan username"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
          />
        </div>
        <LoginButton handleLogin={handleLogin} /> {/* Komponen tombol login */}
        {error && <p className="error">{error}</p>} {/* Menampilkan error */}
        <div className="register-links">
          <a href="/RegisterUser">Daftar sebagai User</a> {/* Link ke halaman register */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
