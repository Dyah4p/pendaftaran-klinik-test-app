import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PilihJadwal.css';

const PilihJadwal = () => {
  const { dokterId } = useParams();
  const [jadwals, setJadwals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const jadwalData = [
      { id: 1, dokterId: 1, tanggal: '2024-01-01', jam: '10:00' },
      { id: 2, dokterId: 2, tanggal: '2024-01-02', jam: '14:00' },
      { id: 3, dokterId: 3, tanggal: '2024-01-03', jam: '09:00' }
    ];
    localStorage.setItem('jadwals', JSON.stringify(jadwalData));
    setJadwals(jadwalData.filter(jadwal => jadwal.dokterId === parseInt(dokterId)));
  }, [dokterId]);

  const handleJadwalSelect = (jadwalId) => {
    navigate(`/JanjiTemu/${jadwalId}`);
  };

  const handleBackToDashboard = () => {
    navigate('/UserDashboard');
  };

  return (
    <div className="pilih-jadwal">
      <h2>Pilih Jadwal Konsultasi dengan Dokter {dokterId}</h2>
      <div className="jadwal-container">
        {jadwals.map(jadwal => (
          <div key={jadwal.id} className="jadwal-card" onClick={() => handleJadwalSelect(jadwal.id)}>
            <p>{jadwal.tanggal}, {jadwal.jam}</p>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={handleBackToDashboard}>Kembali</button>
    </div>
  );
};

export default PilihJadwal;
