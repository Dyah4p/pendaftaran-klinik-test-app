import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './KelolaJadwal.css';

const KelolaJadwal = () => {
  const [jadwals, setJadwals] = useState([]);
  const [dokter, setDokter] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [jam, setJam] = useState('');
  const [jadwalEdit, setJadwalEdit] = useState(null);

  useEffect(() => {
    const storedJadwals = JSON.parse(localStorage.getItem('jadwals')) || [];
    setJadwals(storedJadwals);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('jadwals', JSON.stringify(jadwals));
  }, [jadwals]);
  

  useEffect(() => {
    localStorage.setItem('jadwals', JSON.stringify(jadwals));
  }, [jadwals]);

  const tambahJadwal = () => {
    const jadwalBaru = { id: Date.now(), dokter, tanggal, jam, created_at: new Date().toISOString() };
    setJadwals([...jadwals, jadwalBaru]);
    setDokter('');
    setTanggal('');
    setJam('');
  };

  const updateJadwal = () => {
    const jadwalsDiperbarui = jadwals.map(jadwal =>
      jadwal.id === jadwalEdit.id ? { ...jadwal, dokter, tanggal, jam, created_at: jadwalEdit.created_at } : jadwal
    );
    setJadwals(jadwalsDiperbarui);
    setJadwalEdit(null);
    setDokter('');
    setTanggal('');
    setJam('');
  };

  const hapusJadwal = (id) => {
    const jadwalsDiperbarui = jadwals.filter(jadwal => jadwal.id !== id);
    setJadwals(jadwalsDiperbarui);
  };

  return (
    <div className="kelola-jadwal">
      <div className="sidebar">
        <Link to="/admin-dashboard">Dashboard</Link>
        <Link to="/kelola-dokter">Kelola Dokter</Link>
        <Link to="/kelola-poli">Kelola Poli</Link>
        <Link to="/kelola-pasien">Kelola Data Pasien</Link>
        <Link to="/kelola-jadwal">Kelola Jadwal</Link>
        <Link to="/konfirmasi-janji">Konfirmasi Janji Temu</Link>
        <Link to="/riwayat-pasien">Riwayat Pasien</Link>
      </div>
      <div className="main-content">
        <h2>Kelola Jadwal</h2>
        <div className="form-group">
          <label>Dokter:</label>
          <input
            type="text"
            value={dokter}
            onChange={(e) => setDokter(e.target.value)}
          />
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
        <button onClick={jadwalEdit ? updateJadwal : tambahJadwal}>
          {jadwalEdit ? 'Update Jadwal' : 'Tambah Jadwal'}
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Dokter</th>
              <th>Tanggal</th>
              <th>Jam</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jadwals.map(jadwal => (
              <tr key={jadwal.id}>
                <td>{jadwal.id}</td>
                <td>{jadwal.dokter}</td>
                <td>{jadwal.tanggal}</td>
                <td>{jadwal.jam}</td>
                <td>
                  <button onClick={() => {
                    setJadwalEdit(jadwal);
                    setDokter(jadwal.dokter);
                    setTanggal(jadwal.tanggal);
                    setJam(jadwal.jam);
                  }}>Edit</button>
                  <button onClick={() => hapusJadwal(jadwal.id)}>Hapus</button>
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
