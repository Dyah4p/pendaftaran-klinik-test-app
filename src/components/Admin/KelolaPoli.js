import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './KelolaPoli.css';

const KelolaPoli = () => {
  const [polis, setPolis] = useState([]);
  const [nama, setNama] = useState('');
  const [poliEdit, setPoliEdit] = useState(null);
  const [image, setImage] = useState('');

  useEffect(() => {
    const storedPolis = JSON.parse(localStorage.getItem('dataPoli')) || [];
    setPolis(storedPolis);
    console.log('Data polis yang diambil di admin:', storedPolis);
  }, []);

  useEffect(() => {
    localStorage.setItem('dataPoli', JSON.stringify(polis));
    console.log('Data polis yang disimpan:', polis);
  }, [polis]);

  const tambahPoli = () => {
    const poliBaru = { id: Date.now(), nama, image, created_at: new Date().toISOString() };
    setPolis([...polis, poliBaru]);
    setNama('');
    setImage('');
    console.log('Poli baru ditambahkan:', poliBaru);
  };

  const updatePoli = () => {
    const polisDiperbarui = polis.map(poli =>
      poli.id === poliEdit.id ? { ...poli, nama, image, created_at: poliEdit.created_at } : poli
    );
    setPolis(polisDiperbarui);
    setPoliEdit(null);
    setNama('');
    setImage('');
    console.log('Poli diupdate:', polisDiperbarui);
  };

  const hapusPoli = (id) => {
    const polisDiperbarui = polis.filter(poli => poli.id !== id);
    setPolis(polisDiperbarui);
    console.log('Poli dihapus, ID:', id);
  };

  return (
    <div className="kelola-poli">
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
        <h2>Kelola Poli</h2>
        <div className="form-group">
          <label>Nama:</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Gambar:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Masukkan URL gambar"
          />
        </div>
        <button onClick={poliEdit ? updatePoli : tambahPoli}>
          {poliEdit ? 'Update Poli' : 'Tambah Poli'}
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Gambar</th>
              <th>Created At</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {polis.map(poli => (
              <tr key={poli.id}>
                <td>{poli.id}</td>
                <td>{poli.nama}</td>
                <td><img src={poli.image} alt={poli.nama} className="poli-image" /></td>
                <td>{poli.created_at}</td>
                <td>
                  <button onClick={() => {
                    setPoliEdit(poli);
                    setNama(poli.nama);
                    setImage(poli.image);
                  }}>Edit</button>
                  <button onClick={() => hapusPoli(poli.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KelolaPoli;
