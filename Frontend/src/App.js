// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext'; 
import { PoliProvider } from './contexts/PoliContext';
import { DokterProvider } from './contexts/DokterContext';  
import { JadwalProvider } from './contexts/JadwalContext';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserDashboard from './pages/Pasien/UserDashboard';
import KelolaDokter from './pages/Admin/KelolaDokter';
import KelolaPoli from './pages/Admin/KelolaPoli';
import KelolaPasien from './pages/Admin/KelolaPasien';
import KelolaJadwal from './pages/Admin/KelolaJadwal';
import RiwayatPasien from './pages/Admin/RiwayatPasien';
import LoginPage from './pages/Pasien/LoginPage';
import RegisterAdmin from './pages/Admin/RegisterAdmin';
import Loginadmin from './pages/Admin/Loginadmin';
import RegisterUser from './pages/Pasien/RegisterUser';
import PilihPoli from './pages/Pasien/PilihPoli';
import PilihDokter from './pages/Pasien/PilihDokter';
import PilihJadwal from './pages/Pasien/PilihJadwal';
import JanjiTemu from './pages/Pasien/JanjiTemu';
import ProfilUser from './pages/Pasien/ProfilUser';
import UserHistory from './pages/Pasien/UserHistory';

function App() {
  return (
    // Memastikan bahwa Router hanya dibungkus sekali dan context providers di luar Router
    <UserProvider>
      <PoliProvider>
        <DokterProvider>
          <JadwalProvider>
        <Router>
          <Routes>
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/Loginadmin" element={<Loginadmin />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/UserDashboard" element={<UserDashboard />} />
            <Route path="/KelolaDokter" element={<KelolaDokter />} />
            <Route path="/KelolaPoli" element={<KelolaPoli />} />
            <Route path="/KelolaPasien" element={<KelolaPasien />} />
            <Route path="/KelolaJadwal" element={<KelolaJadwal />} />
            <Route path="/RiwayatPasien" element={<RiwayatPasien />} />
            <Route path="/RegisterAdmin" element={<RegisterAdmin />} />
            <Route path="/RegisterUser" element={<RegisterUser />} />
            <Route path="/PilihPoli" element={<PilihPoli />} />
            <Route path="/PilihDokter/:polis_id" element={<PilihDokter />} />
            <Route path="/PilihJadwal/:dokter_id" element={<PilihJadwal />} />
            <Route path="/janji-temu/:dokter_id/:jadwal_id" element={<JanjiTemu />} />
            <Route path="/ProfilUser" element={<ProfilUser />} />
            <Route path="/UserHistory" element={<UserHistory />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </Router>
        </JadwalProvider>
      </DokterProvider>
      </PoliProvider>
    </UserProvider>
  );
}

export default App;
