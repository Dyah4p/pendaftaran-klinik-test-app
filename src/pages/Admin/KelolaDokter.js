import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './KelolaDokter.css';
import KelolaDokterButton from '../../components/adminbutton/KelolaDokterButton'; // Impor komponen tombol

const KelolaDokter = () => {
  const [dokters, setDokters] = useState([]);
  const [nama, setNama] = useState('');
  const [spesialis, setSpesialis] = useState('');
  const [dokterEdit, setDokterEdit] = useState(null);

  const tambahDokter = () => {
    const dokterBaru = { id: Date.now(), nama, spesialis };
    setDokters([...dokters, dokterBaru]);
    setNama('');
    setSpesialis('');
  };

  const updateDokter = () => {
    const doktersDiperbarui = dokters.map(dokter =>
      dokter.id === dokterEdit.id ? { ...dokter, nama, spesialis } : dokter
    );
    setDokters(doktersDiperbarui);
    setDokterEdit(null);
    setNama('');
    setSpesialis('');
  };

  const hapusDokter = (id) => {
    const doktersDiperbarui = dokters.filter(dokter => dokter.id !== id);
    setDokters(doktersDiperbarui);
  };

  return (
    <div className="kelola-dokter">
      <div className="sidebar">
        <Link to="/AdminDashboard">Dashboard</Link>
        <Link to="/KelolaDokter">Kelola Dokter</Link>
        <Link to="/KelolaPoli">Kelola Poli</Link>
        <Link to="/KelolaPasien">Kelola Data Pasien</Link>
        <Link to="/KelolaJadwal">Kelola Jadwal</Link>
        <Link to="/KonfirmasiJanji">Konfirmasi Janji Temu</Link>
        <Link to="/RiwayatPasien">Riwayat Pasien</Link>
      </div>
      <div className="main-content">
        <h2>Kelola Dokter</h2>
        <div>
          <label>Nama:</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div>
          <label>Spesialis:</label>
          <input
            type="text"
            value={spesialis}
            onChange={(e) => setSpesialis(e.target.value)}
          />
        </div>
        <KelolaDokterButton dokterEdit={dokterEdit} tambahDokter={tambahDokter} updateDokter={updateDokter} />
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Spesialis</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dokters.map(dokter => (
              <tr key={dokter.id}>
                <td>{dokter.nama}</td>
                <td>{dokter.spesialis}</td>
                <td>
                  <button onClick={() => {
                    setDokterEdit(dokter);
                    setNama(dokter.nama);
                    setSpesialis(dokter.spesialis);
                  }}>Edit</button>
                  <button onClick={() => hapusDokter(dokter.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KelolaDokter;
