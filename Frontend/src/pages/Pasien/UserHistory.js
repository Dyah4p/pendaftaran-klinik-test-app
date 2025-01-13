import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext'; // Mengambil user context
import { usePoli } from '../../contexts/PoliContext'; // Mengambil PoliContext
import BackButton from '../../components/pasienbutton/BackButton';

const UserHistory = () => {
  const { user } = useUser();
  const { polies, error: poliError } = usePoli();
  const [histories, setHistories] = useState([]);
  const [doctors, setDoctors] = useState([]);
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
        if (data.success) {
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

  // Fetch riwayat janji temu
  useEffect(() => {
    if (userId) {
      const fetchHistory = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/appointments`);
          
          if (!response.ok) {
            setError(`HTTP Error: ${response.status}`);
            console.error(`HTTP Error: ${response.status}`);
            return;
          }

          const data = await response.json();
          console.log('Data riwayat janji temu:', data); // Memeriksa struktur data

          if (data.success) {
            setHistories(data.data);
          } else {
            setError(data.message || 'Data riwayat janji temu tidak ditemukan');
            console.error('Gagal mengambil riwayat janji temu:', data.message);
          }
        } catch (error) {
          setError(`Error mengambil riwayat janji temu: ${error.message}`);
          console.error('Error mengambil riwayat janji temu:', error.message);
        }
      };

      fetchHistory();
    } else {
      setError('User ID tidak tersedia.');
      console.log('User ID tidak ditemukan:', userId);
    }
  }, [userId]);

  // Aksi untuk kembali ke dashboard
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
            const poli = polies.find((poli) => poli.id === history.polis_id);
            const dokter = doctors.find((dokter) => dokter.id === history.dokter_id);
            const dokterNama = dokter ? dokter.nama : 'Dokter tidak ditemukan';

            // Log untuk memeriksa apakah poli, dokter, email, dan jadwal ditemukan
            console.log('Riwayat Janji Temu:', history);
            if (!poli) {
              console.log('Poli tidak ditemukan untuk ID:', history.polis_id);
            }
            if (!dokter) {
              console.log('Dokter tidak ditemukan untuk ID:', history.dokter_id);
            }
            console.log('Email:', history.email || 'Email tidak ditemukan');
            console.log('Tanggal Jadwal:', history.tanggal_jadwal || 'Tanggal tidak ditemukan');
            console.log('Jam Jadwal:', history.jam || 'Jam tidak ditemukan');
            console.log('Status:', history.status || 'Status tidak ditemukan');

            return (
              <div className="history-item" key={history.id}>
                <p><strong>Nama:</strong> {history.nama || 'Nama tidak ditemukan'}</p>
                <p><strong>Tanggal Lahir:</strong> {history.tanggal_lahir || 'Tanggal Lahir tidak ditemukan'}</p>
                <p><strong>Nomor Telepon:</strong> {history.nomor_telepon || 'Nomor Telepon tidak ditemukan'}</p>
                <p><strong>Email:</strong> {history.email || 'Email tidak ditemukan'}</p>
                <p><strong>Jadwal:</strong> {history.tanggal_jadwal || 'Tanggal Jadwal tidak ditemukan'} {history.jam || 'Jam tidak ditemukan'}</p>
                <p><strong>Dokter:</strong> {dokterNama}</p>
                <p><strong>Poli:</strong> {poli ? poli.nama : 'Poli tidak ditemukan'}</p>
                <p><strong>Status:</strong> {history.status || 'Status tidak ditemukan'}</p>
              </div>
            );
          })
        ) : (
          <p>Tidak ada riwayat janji temu yang ditemukan.</p>
        )}
      </div>

      <BackButton onClick={handleBackToDashboard} />
    </div>
  );
};

export default UserHistory;
