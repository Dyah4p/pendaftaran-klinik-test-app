import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { usePoli } from '../../contexts/PoliContext';
import './JanjiTemu.css';

const JanjiTemu = () => {
  const { dokter_id, jadwal_id } = useParams(); // Mengambil parameter dari URL
  const { user } = useUser(); // Ambil user dari context
  const { polisId: contextPolisId } = usePoli(); // Ambil polis_id dari PoliContext
  const [nama, setNama] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [email, setEmail] = useState('');
  const [dokter, setDokter] = useState();
  const [jadwal, setJadwal] = useState();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setError('User belum login!');
    }
  }, [user]);

  const userId = user ? user.user_id : null;

  // Ambil data dokter dan jadwal berdasarkan parameter
  useEffect(() => {
    if (userId && contextPolisId && dokter_id && jadwal_id) {
      const fetchDokterAndJadwal = async () => {
        try {
          // Ambil data dokter berdasarkan dokter_id
          const dokterResponse = await fetch(`http://localhost:4000/api/doctors/${dokter_id}`);
          const dokterData = await dokterResponse.json();
          setDokter(dokterData.data);

          // Ambil data jadwal berdasarkan jadwal_id
          const jadwalResponse = await fetch(`http://localhost:4000/api/jadwals/${jadwal_id}`);
          const jadwalData = await jadwalResponse.json();
          setJadwal(jadwalData.data);
        } catch (error) {
          setError('Gagal memuat data dokter dan jadwal');
        }
      };

      fetchDokterAndJadwal();
    } else {
      setError('Data tidak lengkap, harap pastikan semuanya valid!');
    }
  }, [userId, contextPolisId, dokter_id, jadwal_id]);

  // Kirimkan data janji temu
  const handleConfirm = async () => {
    if (!nama || !tanggalLahir || !nomorTelepon || !email) {
      setError('Semua kolom harus diisi!');
      return;
    }

    const janjiTemu = {
      user_id: userId, // Pastikan user_id tersedia
      nama,
      tanggal_lahir: tanggalLahir,
      nomor_telepon: nomorTelepon,
      email,
      jadwal_id,
      dokter_id,
      polis_id: contextPolisId, // Menggunakan polis_id dari context
      status: 'pending', // Status default adalah "pending"
    };

    try {
      const response = await fetch('http://localhost:4000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(janjiTemu),
      });

      const data = await response.json();
      if (data.status === 'success') {
        navigate('/UserHistory'); // Redirect ke halaman riwayat pengguna
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(`Error mengkonfirmasi janji temu: ${error.message}`);
    }
  };

  return (
    <div className="janji-temu">
      <h2>Konfirmasi Janji Temu</h2>
      {error && <p className="error">{error}</p>}

      {dokter && jadwal ? (
        <>
          <p>Dokter: {dokter.nama}</p>
          <p>Jadwal: {jadwal.waktu}</p>

          <form>
            <label>Nama:</label>
            <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} required />
            <label>Tanggal Lahir:</label>
            <input type="date" value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} required />
            <label>Nomor Telepon:</label>
            <input type="tel" value={nomorTelepon} onChange={(e) => setNomorTelepon(e.target.value)} required />
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="button" onClick={handleConfirm}>Konfirmasi</button>
          </form>
        </>
      ) : (
        <p>Memuat data dokter, jadwal...</p>
      )}

      <button className="back-button" onClick={() => navigate('/UserDashboard')}>Kembali</button>
    </div>
  );
};

export default JanjiTemu;
