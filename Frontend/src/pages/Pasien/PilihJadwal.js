import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PilihJadwal.css';

const PilihJadwal = () => {
  const { dokter_id } = useParams();
  const [jadwals, setJadwals] = useState([]); // Menyimpan data jadwal
  const [error, setError] = useState(''); // Menyimpan pesan error
  const navigate = useNavigate();

  // Mengambil jadwal berdasarkan dokter_id
  useEffect(() => {
    const fetchJadwals = async () => {
      try {
        // Mengambil jadwal berdasarkan dokter_id
        const response = await fetch(`http://localhost:4000/api/jadwals/${dokter_id}`);
        const data = await response.json();
        if (data.status === 'success') {
          setJadwals(data.data); // Simpan data jadwal ke state
        } else {
          setError(data.message); // Tampilkan pesan error jika data gagal diambil
        }
      } catch (error) {
        setError(`Error fetching jadwals data: ${error.message}`); // Tampilkan pesan error jaringan
      }
    };

    fetchJadwals();
  }, [dokter_id]);

  const handleJadwalSelect = async (jadwal_id) => {
    try {
      const response = await fetch('http://localhost:4000/api/jadwals', {
        method: 'POST', // Menggunakan method POST untuk memilih jadwal
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jadwal_id }), // Kirim ID jadwal ke backend
      });
      const data = await response.json();
      if (data.status === 'success') {
        // Navigasi ke rute dengan format sesuai yang didefinisikan di App.js
        navigate(`/janji-temu/${dokter_id}/${jadwal_id}`);
      } else {
        setError(data.message); // Tampilkan pesan error jika gagal
      }
    } catch (error) {
      setError(`Error selecting jadwal: ${error.message}`); // Tampilkan pesan error jaringan
    }
  };
  

  const handleBackToDashboard = () => {
    navigate('/UserDashboard'); // Navigasi kembali ke dashboard
  };

  return (
    <div className="pilih-jadwal">
      <h2>Pilih Jadwal untuk Dokter {dokter_id}</h2>
      {error && <p className="error">{error}</p>} {/* Menampilkan pesan error jika ada */}
      <div className="jadwal-container">
        {jadwals.length > 0 ? (
          jadwals.map((jadwal) => (
            <div key={jadwal.jadwal_id} className="jadwal-card" onClick={() => handleJadwalSelect(jadwal.jadwal_id)}>
              <p>{jadwal.tanggal} - {jadwal.jam}</p>
            </div>
          ))
        ) : (
          <p className="no-data">Tidak ada jadwal yang tersedia.</p>
        )}
      </div>
      <button className="back-button" onClick={handleBackToDashboard}>Kembali</button>
    </div>
  );
};

export default PilihJadwal;
