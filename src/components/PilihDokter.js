import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PilihDokter.css';

const PilihDokter = () => {
  const { poliId } = useParams();
  const [dokters, setDokters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dokterData = [
      { id: 1, poliId: 1, nama: 'Dr. Dyah', image: 'https://via.placeholder.com/150' },
      { id: 2, poliId: 2, nama: 'Dr. Garin', image: 'https://via.placeholder.com/150' },
      { id: 3, poliId: 3, nama: 'Dr. Claudea', image: 'https://via.placeholder.com/150' }
    ];
    localStorage.setItem('dokters', JSON.stringify(dokterData));
    setDokters(dokterData.filter(dokter => dokter.poliId === parseInt(poliId)));
  }, [poliId]);

  const handleDokterSelect = (dokterId) => {
    navigate(`/PilihJadwal/${dokterId}`);
  };

  const handleBackToDashboard = () => {
    navigate('/user-dashboard');
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
