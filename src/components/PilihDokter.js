import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PilihDokter.css';

const PilihDokter = () => {
  const { poliId } = useParams();
  const [dokters, setDokters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dokterData = [
      { id: 1, poliId: 1, nama: 'Dr. Dyah', image: '/img/dyah.png' },
      { id: 2, poliId: 2, nama: 'Dr. Garin', image: '/img/garin.jpg' },
      { id: 3, poliId: 3, nama: 'Dr. Claudea', image: '/img/claudea.jpg' }
    ];
    localStorage.setItem('dokters', JSON.stringify(dokterData));
    setDokters(dokterData.filter(dokter => dokter.poliId === parseInt(poliId)));
  }, [poliId]);

  const handleDokterSelect = (dokterId) => {
    navigate(`/PilihJadwal/${dokterId}`);
  };

  const handleBackToDashboard = () => {
    navigate('/UserDashboard');
  };

  return (
    <div className="pilih-dokter">
      <h2>Pilih Dokter untuk Poli {poliId}</h2>
      <div className="dokter-container">
        {dokters.map(dokter => (
          <div key={dokter.id} className="dokter-card" onClick={() => handleDokterSelect(dokter.id)}>
            <img src={dokter.image} alt={dokter.nama} className="dokter-image" />
            <p>{dokter.nama}</p>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={handleBackToDashboard}>Kembali</button>
    </div>
  );
};

export default PilihDokter;
