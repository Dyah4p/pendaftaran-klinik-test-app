import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import KelolaDokter from './components/KelolaDokter';
import KelolaPoli from './components/KelolaPoli';
import KelolaPasien from './components/KelolaPasien';
import KelolaJadwal from './components/KelolaJadwal';
import KonfirmasiJanji from './components/KonfirmasiJanji';
import RiwayatPasien from './components/RiwayatPasien';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/kelola-dokter" element={<KelolaDokter />} />
        <Route path="/kelola-poli" element={<KelolaPoli />} />
        <Route path="/kelola-pasien" element={<KelolaPasien />} />
        <Route path="/kelola-jadwal" element={<KelolaJadwal />} />
        <Route path="/riwayat-pasien" element={<RiwayatPasien />} />
        <Route path="/konfirmasi-janji" element={<KonfirmasiJanji />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
