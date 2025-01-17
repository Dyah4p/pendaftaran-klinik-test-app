import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext'; // Mengambil user context
import { usePoli } from '../../contexts/PoliContext'; // Mengambil PoliContext
import BackButton from '../../components/pasienbutton/BackButton'; // Impor komponen tombol kembali
import './UserHistory.css';

const UserHistory = () => {
  const { user } = useUser();
  const { polies, error: poliError } = usePoli();
  const [histories, setHistories] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setError('User belum login!');
    }
  }, [user]);

  const userId = user ? user.user_id : null;

  // Fetch data dokter
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/doctors`);
        const data = await response.json();
        if (data.status === 'success') {
          setDoctors(data.data);
          console.log('Data dokter berhasil diambil:', data.data);
        } else {
          setError(data.message);
          console.error('Gagal mengambil data dokter:', data.message);
        }
      } catch (error) {
        setError(`Error mengambil data dokter: ${error.message}`);
        console.error('Error mengambil data dokter:', error.message);
      }
    };

    fetchDoctors();
  }, []);

  // Fetch data jadwal
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/jadwals`);
        const data = await response.json();
        if (data.status === 'success') {
          setSchedule(data.data);
          console.log('Data jadwal berhasil diambil:', data.data);
        } else {
          setError(data.message);
          console.error('Gagal mengambil data jadwal:', data.message);
        }
      } catch (error) {
        setError(`Error mengambil data jadwal: ${error.message}`);
        console.error('Error mengambil data jadwal:', error.message);
      }
    };

    fetchSchedule();
  }, []);

  // Fetch riwayat janji temu
  useEffect(() => {
    if (userId) {
      const fetchHistory = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/appointments/history`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId }),
          });

          if (!response.ok) {
            setError(`HTTP Error: ${response.status}`);
            return;
          }

          const data = await response.json();

          if (data.status === 'success') {
            setHistories(data.data);
          } else {
            setError(data.message || 'Data riwayat janji temu tidak ditemukan');
          }
        } catch (error) {
          setError(`Error mengambil riwayat janji temu: ${error.message}`);
        }
      };

      fetchHistory();
    } else {
      setError('User ID tidak tersedia.');
    }
  }, [userId]);

  const handleBackToDashboard = () => {
    navigate('/UserDashboard');
  };

  return (
    <div className="user-history">
      <h2>Riwayat Pendaftaran</h2>
      {error && <p className="error">{error}</p>}
      {poliError && <p className="error">{poliError}</p>}

      <div className="history-container">
        {histories.length > 0 ? (
          histories.map((history) => {
            // Mengambil data poli, dokter, dan jadwal berdasarkan ID
            const poli = polies ? polies.find((poli) => poli.id === history.polis_id) : null;
            const dokter = doctors ? doctors.find((dokter) => dokter.id === history.dokter_id) : null;
            const jadwal = schedule ? schedule.find((jadwal) => jadwal.id === history.jadwal_id) : null;

            const dokterNama = dokter ? dokter.nama : 'Dokter tidak ditemukan';
            const poliNama = poli ? poli.nama : 'Poli tidak ditemukan';
            const jadwalNama = jadwal ? `${jadwal.tanggal} ${jadwal.jam}` : 'Jadwal tidak ditemukan';

            return (
              <div className="history-item" key={history.appointment_id}>
                <p><strong>Nama:</strong> {history.nama || 'Nama tidak ditemukan'}</p>
                <p><strong>Tanggal Lahir:</strong> {history.tanggal_lahir}</p>
                <p><strong>Nomor Telepon:</strong> {history.nomor_telepon}</p>
                <p><strong>Email:</strong> {history.email}</p>
                <p><strong>Jadwal:</strong> {jadwalNama}</p>
                <p><strong>Dokter:</strong> {dokterNama}</p>
                <p><strong>Poli:</strong> {poliNama}</p>
              </div>
            );
          })
        ) : (
          <p>Tidak ada riwayat janji temu yang ditemukan.</p>
        )}
      </div>

      {/* Tombol kembali */}
      <BackButton handleBackToDashboard={handleBackToDashboard} />
    </div>
  );
};

export default UserHistory;
