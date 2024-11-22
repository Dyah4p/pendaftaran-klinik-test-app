
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserDashboard from './pages/Pasien/UserDashboard';
import KelolaDokter from './pages/Admin/KelolaDokter';
import KelolaPoli from './pages/Admin/KelolaPoli';
import KelolaPasien from './pages/Admin/KelolaPasien';
import KelolaJadwal from './pages/Admin/KelolaJadwal';
import KonfirmasiJanji from './pages/Admin/KonfirmasiJanji';
import RiwayatPasien from './pages/Admin/RiwayatPasien';
import LoginPage from './pages/Pasien/LoginPage';
import RegisterAdmin from './pages/Admin/RegisterAdmin';
import RegisterUser from './pages/Pasien/RegisterUser'
import PilihPoli from './pages/Pasien/PilihPoli';
import PilihDokter from './pages/Pasien/PilihDokter';
import PilihJadwal from './pages/Pasien/PilihJadwal';
import JanjiTemu from './pages/Pasien/JanjiTemu';
import ProfilUser from './pages/Pasien/ProfilUser';
import UserHistory from './pages/Pasien/UserHistory';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path="/KelolaDokter" element={<KelolaDokter />} />
          <Route path="/KelolaPoli" element={<KelolaPoli />} />
          <Route path="/KelolaPasien" element={<KelolaPasien />} />
          <Route path="/KelolaJadwal" element={<KelolaJadwal />} />
          <Route path="/KonfirmasiJanji" element={<KonfirmasiJanji />} />
          <Route path="/RiwayatPasien" element={<RiwayatPasien />} />
          <Route path="/RegisterAdmin" element={<RegisterAdmin />} />
          <Route path="/RegisterUser" element={<RegisterUser />} />
          <Route path="/PilihPoli" element={<PilihPoli />} />
          <Route path="/PilihDokter/:poliId" element={<PilihDokter />} />
          <Route path="/PilihJadwal/:dokterId" element={<PilihJadwal />} />
          <Route path="/JanjiTemu/:jadwalId" element={<JanjiTemu />} />
          <Route path="/ProfilUser" element={<ProfilUser />} />
          <Route path="/UserHistory" element={<UserHistory />} />
          <Route path="/" element={<LoginPage />} />
          </Routes>
    </Router>
  );
}

export default App;
