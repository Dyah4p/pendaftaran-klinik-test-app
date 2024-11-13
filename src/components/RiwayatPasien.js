import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RiwayatPasien.css';

const RiwayatPasien = () => {
  const [riwayats, setRiwayats] = useState([]);
  const [nama, setNama] = useState('');
  const [tanggalKunjungan, setTanggalKunjungan] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [tindakan, setTindakan] = useState('');
  const [riwayatEdit, setRiwayatEdit] = useState(null);

  const tambahRiwayat = () => {
    const riwayatBaru = { id: Date.now(), nama, tanggal_kunjungan: tanggalKunjungan, diagnosis, tindakan, created_at: new Date().toISOString() };
    setRiwayats([...riwayats, riwayatBaru]);
    setNama('');
    setTanggalKunjungan('');
    setDiagnosis('');
    setTindakan('');
  };

  const updateRiwayat = () => {
    const riwayatsDiperbarui = riwayats.map(riwayat =>
      riwayat.id === riwayatEdit.id ? { ...riwayat, nama, tanggal_kunjungan: tanggalKunjungan, diagnosis, tindakan, created_at: riwayatEdit.created_at } : riwayat
    );
    setRiwayats(riwayatsDiperbarui);
    setRiwayatEdit(null);
    setNama('');
    setTanggalKunjungan('');
    setDiagnosis('');
    setTindakan('');
  };

  const hapusRiwayat = (id) => {
    const riwayatsDiperbarui = riwayats.filter(riwayat => riwayat.id !== id);
    setRiwayats(riwayatsDiperbarui);
  };

  return (
    <div className="riwayat-pasien">
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
        <h2>Riwayat Pasien</h2>
        <div>
          <label>Nama:</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div>
          <label>Tanggal Kunjungan:</label>
          <input
            type="date"
            value={tanggalKunjungan}
            onChange={(e) => setTanggalKunjungan(e.target.value)}
          />
        </div>
        <div>
          <label>Diagnosis:</label>
          <input
            type="text"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </div>
        <div>
          <label>Tindakan:</label>
          <input
            type="text"
            value={tindakan}
            onChange={(e) => setTindakan(e.target.value)}
          />
        </div>
        <button onClick={riwayatEdit ? updateRiwayat : tambahRiwayat}>
          {riwayatEdit ? 'Update Riwayat' : 'Tambah Riwayat'}
        </button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Tanggal Kunjungan</th>
              <th>Diagnosis</th>
              <th>Tindakan</th>
              <th>Created At</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {riwayats.map(riwayat => (
              <tr key={riwayat.id}>
                <td>{riwayat.id}</td>
                <td>{riwayat.nama}</td>
                <td>{riwayat.tanggal_kunjungan}</td>
                <td>{riwayat.diagnosis}</td>
                <td>{riwayat.tindakan}</td>
                <td>{riwayat.created_at}</td>
                <td>
                  <button onClick={() => {
                    setRiwayatEdit(riwayat);
                    setNama(riwayat.nama);
                    setTanggalKunjungan(riwayat.tanggal_kunjungan);
                    setDiagnosis(riwayat.diagnosis);
                    setTindakan(riwayat.tindakan);
                  }}>Edit</button>
                  <button onClick={() => hapusRiwayat(riwayat.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiwayatPasien;
