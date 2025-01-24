import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useDokter } from '../../contexts/DokterContext';
import { useJadwal } from '../../contexts/JadwalContext';
import { usePoli } from '../../contexts/PoliContext';
import BackButton from '../../components/pasienbutton/BackButton';
import './UserHistory.css';

const UserHistory = () => {
  const { user } = useUser();
  const { polies: contextPolies } = usePoli();
  const { dokters } = useDokter();
  const { jadwals } = useJadwal();
  const [histories, setHistories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setError('User belum login!');
    }
  }, [user]);

  const userId = user ? user.user_id : null;

  useEffect(() => {
    if (userId) {
      const fetchHistory = async () => {
        try {
          const response = await fetch('http://localhost:4000/api/appointments/history', {
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

      <div className="history-container">
        {histories.length > 0 ? (
          histories.map((history) => {
            const dokter = dokters?.find((doc) => doc.id === history.dokter_id) || { id: history.dokter_id };
            const jadwal = jadwals?.find((schedule) => schedule.id === history.jadwal_id) || { id: history.jadwal_id };
            const poli = contextPolies?.find((p) => p.id === history.polis_id) || { id: history.polis_id };

            const dokterNama = dokter ? dokter.nama || dokter.id : dokter.id;
            const jadwalNama = jadwal && jadwal.tanggal
              ? `${new Date(jadwal.tanggal).toLocaleDateString()} (${new Date('1970-01-01T' + jadwal.jam).toLocaleTimeString()})`
              : jadwal.id;
            const poliNama = poli ? poli.nama || poli.id : poli.id;

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

      <BackButton handleBackToDashboard={handleBackToDashboard} />
    </div>
  );
};

export default UserHistory;
