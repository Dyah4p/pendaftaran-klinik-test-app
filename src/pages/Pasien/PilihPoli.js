import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PilihPoli.css';

const PilihPoli = () => {
  const [polis, setPolis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const defaultPolis = [
      { id: 1, nama: 'Poli Umum', image: '/img/gambar_dokter.png' },
      { id: 2, nama: 'Poli Gigi', image: '/img/gambar_gigi.png' },
      { id: 3, nama: 'Poli THT', image: '/img/gambar_tht.png' }
    ];
    const storedPolis = JSON.parse(localStorage.getItem('dataPoli')) || defaultPolis;
    localStorage.setItem('dataPoli', JSON.stringify(storedPolis));
    setPolis(storedPolis);
  }, []);

  const handlePoliSelect = (id) => {
    navigate(`/PilihDokter/${id}`);
  };

  const handleBackToDashboard = () => {
    navigate('/UserDashboard');
  };

  return (
    <div className="pilih-poli">
      <h2>Pilih Poli</h2>
      <div className="poli-container">
        {polis.map(poli => (
          <div key={poli.id} className="poli-card" onClick={() => handlePoliSelect(poli.id)}>
            <img 
              src={poli.image} 
              alt={poli.nama} 
              className="poli-image" 
              onError={(e) => {e.target.src='https://via.placeholder.com/150'}} 
            />
            <p>{poli.nama}</p>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={handleBackToDashboard}>Kembali</button>
    </div>
  );
};

export default PilihPoli;
