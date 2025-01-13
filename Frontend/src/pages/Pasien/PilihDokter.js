import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PilihDokter.css';

const PilihDokter = () => {
  const { polis_id } = useParams(); // Mengambil ID poli dari URL
  const [dokters, setDokters] = useState([]); // Menyimpan data dokter
  const [error, setError] = useState(''); // Menyimpan pesan error
  const [loading, setLoading] = useState(true); // Menyimpan status loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDokters = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/doctors/${polis_id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setDokters(data.data);
        } else {
          setError(data.message || 'Gagal mengambil data dokter.');
        }
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false); // Selesai loading
      }
    };

    fetchDokters();
  }, [polis_id]);

  const handleDokterSelect = async (dokter_id) => {
    try {
      const response = await fetch('http://localhost:4000/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dokterId: dokter_id }),
      });

      const data = await response.json();

      if (data.success) {
        navigate(`/PilihJadwal/${dokter_id}`);
      } else {
        setError(data.message || 'Gagal memilih dokter.');
      }
    } catch (error) {
      setError(`Error selecting dokter: ${error.message}`);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/UserDashboard'); // Navigasi kembali ke dashboard
  };

  return (
    <div className="pilih-dokter">
      <h2>Pilih Dokter untuk Poli {polis_id}</h2>
      {loading && <p className="loading">Memuat data dokter...</p>}
      {error && <p className="error">{error}</p>}
      <div className="dokter-container">
        {!loading && dokters.length === 0 && (
          <p className="no-data">Tidak ada dokter tersedia untuk poli ini.</p>
        )}
        {dokters.map((dokter) => (
          <div
            key={dokter.dokter_id}
            className="dokter-card"
            onClick={() => handleDokterSelect(dokter.dokter_id)}
          >
            <img
              src={dokter.image}
              alt={dokter.nama}
              className="dokter-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
            <p>{dokter.nama}</p>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={handleBackToDashboard}>
        Kembali
      </button>
    </div>
  );
};

export default PilihDokter;
