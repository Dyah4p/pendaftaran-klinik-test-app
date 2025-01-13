import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './KelolaPoli.css';
import KelolaPoliButton from '../../components/adminbutton/KelolaPoliButton';

const KelolaPoli = () => {
  const [polis, setPolis] = useState([]);
  const [nama, setNama] = useState('');
  const [image, setImage] = useState('');
  const [poliEdit, setPoliEdit] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    fetch('http://localhost:4000/api/polis')
      .then(response => response.json())
      .then(data => setPolis(data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const tambahPoli = () => {
    const poliBaru = { nama, image };

    fetch('http://localhost:4000/api/polis/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(poliBaru)
    })
      .then(response => response.json())
      .then(data => {
        setPolis([...polis, { ...poliBaru, id: data.poliId, created_at: new Date().toISOString() }]);
        setNama('');
        setImage('');
      })
      .catch(error => console.error('Error adding poli:', error));
  };

  const updatePoli = () => {
    const poliBaru = { nama, image };

    fetch(`http://localhost:4000/api/polis/update/${poliEdit.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(poliBaru)
    })
      .then(() => {
        const polisDiperbarui = polis.map(poli =>
          poli.id === poliEdit.id ? { ...poli, nama, image, created_at: poliEdit.created_at } : poli
        );
        setPolis(polisDiperbarui);
        setPoliEdit(null);
        setNama('');
        setImage('');
      })
      .catch(error => console.error('Error updating poli:', error));
  };

  const hapusPoli = (id) => {
    fetch(`http://localhost:4000/api/polis/delete/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        const polisDiperbarui = polis.filter(poli => poli.id !== id);
        setPolis(polisDiperbarui);
      })
      .catch(error => console.error('Error deleting poli:', error));
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
        <KelolaPoliButton poliEdit={poliEdit} tambahPoli={tambahPoli} updatePoli={updatePoli} />
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
