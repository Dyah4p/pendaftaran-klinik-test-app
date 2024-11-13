import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './KonfirmasiJanji.css';

const KonfirmasiJanji = () => {
  const [janjiTemus, setJanjiTemus] = useState([]);
  const [dokterId, setDokterId] = useState('');
  const [pasienId, setPasienId] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [status, setStatus] = useState('');
  const [feedback, setFeedback] = useState('');
  const [janjiEdit, setJanjiEdit] = useState(null);

  const tambahJanji = () => {
    const janjiBaru = { id: Date.now(), dokter_id: dokterId, pasien_id: pasienId, tanggal, status, feedback, created_at: new Date().toISOString() };
    setJanjiTemus([...janjiTemus, janjiBaru]);
    setDokterId('');
    setPasienId('');
    setTanggal('');
    setStatus('');
    setFeedback('');
  };

  const updateJanji = () => {
    const janjiDiperbarui = janjiTemus.map(janji =>
      janji.id === janjiEdit.id ? { ...janji, dokter_id: dokterId, pasien_id: pasienId, tanggal, status, feedback, created_at: janjiEdit.created_at } : janji
    );
    setJanjiTemus(janjiDiperbarui);
    setJanjiEdit(null);
    setDokterId('');
    setPasienId('');
    setTanggal('');
    setStatus('');
    setFeedback('');
  };

  const hapusJanji = (id) => {
    const janjiDiperbarui = janjiTemus.filter(janji => janji.id !== id);
    setJanjiTemus(janjiDiperbarui);
  };

  return (
    <div className="konfirmasi-janji">
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
        <h2>Konfirmasi Janji Temu</h2>
        <div>
          <label>Dokter ID:</label>
          <input
            type="text"
            value={dokterId}
            onChange={(e) => setDokterId(e.target.value)}
          />
        </div>
        <div>
          <label>Pasien ID:</label>
          <input
            type="text"
            value={pasienId}
            onChange={(e) => setPasienId(e.target.value)}
          />
        </div>
        <div>
          <label>Tanggal:</label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div>
          <label>Feedback:</label>
          <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        <button onClick={janjiEdit ? updateJanji : tambahJanji}>
          {janjiEdit ? 'Update Janji' : 'Tambah Janji'}
        </button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Dokter ID</th>
              <th>Pasien ID</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Created At</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {janjiTemus.map(janji => (
              <tr key={janji.id}>
                <td>{janji.id}</td>
                <td>{janji.dokter_id}</td>
                <td>{janji.pasien_id}</td>
                <td>{janji.tanggal}</td>
                <td>{janji.status}</td>
                <td>{janji.feedback}</td>
                <td>{janji.created_at}</td>
                <td>
                  <button onClick={() => {
                    setJanjiEdit(janji);
                    setDokterId(janji.dokter_id);
                    setPasienId(janji.pasien_id);
                    setTanggal(janji.tanggal);
                    setStatus(janji.status);
                    setFeedback(janji.feedback);
                  }}>Edit</button>
                  <button onClick={() => hapusJanji(janji.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KonfirmasiJanji;
