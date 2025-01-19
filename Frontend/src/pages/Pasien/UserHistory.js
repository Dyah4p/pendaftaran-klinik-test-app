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

  // Fetch data dokter dan jadwal berdasarkan riwayat janji temu
  useEffect(() => {
    const fetchDoctorsAndSchedule = async () => {
      try {
        const doctorResponses = await Promise.all(
          histories.map(async (history) => {
            const doctorResponse = await fetch(`http://localhost:4000/api/doctors/${history.dokter_id}`);
            const doctorData = await doctorResponse.json();
            return doctorData.data;
          })
        );

        const scheduleResponses = await Promise.all(
          histories.map(async (history) => {
            const scheduleResponse = await fetch(`http://localhost:4000/api/jadwals/${history.jadwal_id}`);
            const scheduleData = await scheduleResponse.json();
            return scheduleData.data;
          })
        );

        setDoctors(doctorResponses);
        setSchedule(scheduleResponses);

        console.log('Doctors:', doctorResponses); // Debugging: Memeriksa data dokter
        console.log('Schedule:', scheduleResponses); // Debugging: Memeriksa data jadwal
      } catch (error) {
        setError(`Error mengambil data dokter atau jadwal: ${error.message}`);
        console.error('Error mengambil data dokter atau jadwal:', error.message);
      }
    };

    if (histories.length > 0) {
      fetchDoctorsAndSchedule();
    }
  }, [histories]);

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
          histories.map((history, index) => {
            const poli = polies ? polies.find((poli) => poli.id === history.polis_id) : null;
            const dokter = doctors[index] || null;
            const jadwal = schedule[index] || null;

            const dokterNama = dokter ? dokter.nama : 'Dokter tidak ditemukan';
            const poliNama = poli ? poli.nama : 'Poli tidak ditemukan';
            const jadwalNama = jadwal ? `${jadwal.tanggal} ${jadwal.jam}` : 'Jadwal tidak ditemukan';

            console.log('Doctor:', dokter); // Debugging: Memeriksa data dokter
            console.log('Schedule:', jadwal); // Debugging: Memeriksa data jadwal
            console.log('Poli:', poli); // Debugging: Memeriksa data poli

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
