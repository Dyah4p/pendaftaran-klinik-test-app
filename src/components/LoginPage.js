import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminUsername = localStorage.getItem('adminUsername');
    const adminPassword = localStorage.getItem('adminPassword');
    const userUsername = localStorage.getItem('userUsername');
    const userPassword = localStorage.getItem('userPassword');

    if (role === 'admin' && username === adminUsername && password === adminPassword) {
      navigate('/AdminDashboard');
    } else if (role === 'user' && username === userUsername && password === userPassword) {
      navigate('/UserDashboard');
    } else {
      alert('Username atau password salah');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>LOGIN</h2>
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
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button onClick={handleLogin}>Login</button>
        <div className="register-links">
          <a href="/RegisterAdmin">Daftar sebagai Admin</a>
          <a href="/RegisterUser">Daftar sebagai User</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
