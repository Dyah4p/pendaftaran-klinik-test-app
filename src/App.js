
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import KelolaDokter from './components/Admin/KelolaDokter';
import KelolaPoli from './components/Admin/KelolaPoli';
import KelolaPasien from './components/Admin/KelolaPasien';
import KelolaJadwal from './components/Admin/KelolaJadwal';
import KonfirmasiJanji from './components/Admin/KonfirmasiJanji';
import RiwayatPasien from './components/RiwayatPasien';
import LoginPage from './components/LoginPage';
import RegisterAdmin from './components/Admin/RegisterAdmin';
import RegisterUser from './components/RegisterUser'
import PilihPoli from './components/PilihPoli';
import PilihDokter from './components/PilihDokter';
import PilihJadwal from './components/PilihJadwal';
import JanjiTemu from './components/JanjiTemu';
import ProfilUser from './components/ProfilUser';


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
          <Route path="/" element={<LoginPage />} />
          </Routes>
    </Router>
  );
}

export default App;
