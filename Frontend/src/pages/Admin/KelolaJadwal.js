import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './KelolaJadwal.css';
import KelolaJadwalButton from '../../components/adminbutton/KelolaJadwalButton';

const KelolaJadwal = () => {
  const [jadwals, setJadwals] = useState([]);
  const [dokters, setDokters] = useState([]); // Menyimpan data dokter
  const [dokter, setDokter] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [jam, setJam] = useState('');
  const [jadwalEdit, setJadwalEdit] = useState(null);

  // Mengambil data dokter dari backend
  useEffect(() => {
    fetch('http://localhost:4000/api/doctors')
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setDokters(data.data); // Menyimpan data dokter
        } else {
          console.error('Data dokter tidak valid', data);
        }
      })
      .catch((error) => console.error('Error fetching doctors:', error));
  }, []);

  // Mengambil data jadwal hanya setelah data dokter berhasil diambil
  useEffect(() => {
    if (dokters.length > 0) {
      fetch('http://localhost:4000/api/jadwals')
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success' && Array.isArray(data.data)) {
            setJadwals(data.data);
          } else {
            console.error('Data jadwal tidak valid', data);
          }
        })
        .catch((error) => console.error('Error fetching jadwals:', error));
    }
  }, [dokters]); // Fetch jadwal hanya ketika dokters telah terisi

  // Fungsi untuk menambahkan jadwal
  const tambahJadwal = () => {
    const jadwalBaru = { dokter_id: dokter, tanggal, jam };

    fetch('http://localhost:4000/api/jadwals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jadwalBaru),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setJadwals([...jadwals, data.data]);
          setDokter('');
          setTanggal('');
          setJam('');
        } else {
          console.error('Error adding jadwal:', data.message);
        }
      })
      .catch((error) => console.error('Error adding jadwal:', error));
  };

  // Fungsi untuk mengupdate jadwal
  const updateJadwal = () => {
    const jadwalUpdated = { dokter_id: dokter, tanggal, jam };

    fetch(`http://localhost:4000/api/jadwals/${jadwalEdit.jadwal_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jadwalUpdated),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          const updatedJadwals = jadwals.map((j) =>
            j.jadwal_id === jadwalEdit.jadwal_id
              ? { ...j, dokter_id: dokter, tanggal, jam }
              : j
          );
          setJadwals(updatedJadwals);
          setJadwalEdit(null);
          setDokter('');
          setTanggal('');
          setJam('');
        } else {
          console.error('Error updating jadwal:', data.message);
        }
      })
      .catch((error) => console.error('Error updating jadwal:', error));
  };

  // Fungsi untuk menghapus jadwal
  const hapusJadwal = (jadwal_id) => {
    fetch(`http://localhost:4000/api/jadwals/${jadwal_id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setJadwals(jadwals.filter((j) => j.jadwal_id !== jadwal_id));
      })
      .catch((error) => console.error('Error deleting jadwal:', error));
  };

  return (
    <div className="kelola-jadwal">
      <div className="sidebar">
        <Link to="/Admindashboard">Dashboard</Link>
        <Link to="/KelolaDokter">Kelola Dokter</Link>
        <Link to="/KelolaPoli">Kelola Poli</Link>
        <Link to="/KelolaPasien">Kelola Data Pasien</Link>
        <Link to="/KelolaJadwal">Kelola Jadwal</Link>
        <Link to="/RiwayatPasien">Riwayat Pasien</Link>
      </div>
      <div className="main-content">
        <h2>Kelola Jadwal</h2>
        <div className="form-group">
          <label>Dokter:</label>
          <select
            value={dokter}
            onChange={(e) => setDokter(e.target.value)}
          >
            <option value="">Pilih Dokter</option>
            {dokters.map((dokterItem) => (
              <option key={dokterItem.dokter_id} value={dokterItem.dokter_id}>
                {dokterItem.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Tanggal:</label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Jam:</label>
          <input
            type="time"
            value={jam}
            onChange={(e) => setJam(e.target.value)}
          />
        </div>

        <KelolaJadwalButton jadwalEdit={jadwalEdit} tambahJadwal={tambahJadwal} updateJadwal={updateJadwal} />

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Dokter</th>
              <th>Tanggal</th>
              <th>Jam</th>
              <th>User ID</th> {/* Kolom baru */}
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jadwals.map((jadwal) => (
              <tr key={jadwal.jadwal_id}>
                <td>{jadwal.jadwal_id}</td>
                <td>
                  {dokters.find((dokterItem) => dokterItem.dokter_id === jadwal.dokter_id)?.nama || 'Dokter Tidak Ditemukan'}
                </td>
                <td>{jadwal.tanggal}</td>
                <td>{jadwal.jam}</td>
                <td>{jadwal.user_id || '-'}</td> {/* Menampilkan user_id */}
                <td>
                  <button
                    onClick={() => {
                      setJadwalEdit(jadwal);
                      setDokter(jadwal.dokter_id);
                      setTanggal(jadwal.tanggal);
                      setJam(jadwal.jam);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => hapusJadwal(jadwal.jadwal_id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KelolaJadwal;
