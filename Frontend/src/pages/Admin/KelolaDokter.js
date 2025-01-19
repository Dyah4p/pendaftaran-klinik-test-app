import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './KelolaDokter.css';
import KelolaDokterButton from '../../components/adminbutton/KelolaDokterButton';

const KelolaDokter = () => {
  const [dokters, setDokters] = useState([]);
  const [nama, setNama] = useState('');
  const [image, setImage] = useState('');
  const [polis_id, setPolisId] = useState('');
  const [dokterEdit, setDokterEdit] = useState(null);
  const [polis, setPolis] = useState([]); // Daftar Poliklinik

  // Fetch data dari backend untuk daftar poliklinik
  useEffect(() => {
    fetch('http://localhost:4000/api/polis')
      .then(response => response.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setPolis(data.data); // Menyimpan daftar poli
        } else {
          console.error('Data poliklinik tidak valid', data);
        }
      })
      .catch(error => console.error('Error fetching poliklinik data:', error));
  }, []);

  // Fetch data dokter dari backend
  useEffect(() => {
    fetch('http://localhost:4000/api/doctors')
      .then(response => response.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setDokters(data.data); // Menyimpan data dokter
        } else {
          console.error('Data dokter tidak valid', data);
        }
      })
      .catch(error => console.error('Error fetching doctors:', error));
  }, []);

  // Fungsi untuk menambahkan dokter
  const tambahDokter = () => {
    const dokterBaru = { nama, image, polis_id };

    fetch('http://localhost:4000/api/doctors/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dokterBaru)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setDokters([...dokters, data.doctor]);
          setNama('');
          setImage('');
          setPolisId('');
        } else {
          console.error('Error adding doctor:', data.message);
        }
      })
      .catch(error => console.error('Error adding doctor:', error));
  };

  // Fungsi untuk mengupdate dokter
  const updateDokter = () => {
    const dokterUpdated = { nama, image, polis_id };

    fetch(`http://localhost:4000/api/doctors/update/${dokterEdit.dokter_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dokterUpdated)
    })
      .then(() => {
        const updatedDokters = dokters.map(dokter =>
          dokter.dokter_id === dokterEdit.dokter_id
            ? { ...dokter, nama, image, polis_id }
            : dokter
        );
        setDokters(updatedDokters);
        setDokterEdit(null);
        setNama('');
        setImage('');
        setPolisId('');
      })
      .catch(error => console.error('Error updating doctor:', error));
  };

  // Fungsi untuk menghapus dokter
  const hapusDokter = (dokter_id) => {
    fetch(`http://localhost:4000/api/doctors/delete/${dokter_id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setDokters(dokters.filter(dokter => dokter.dokter_id !== dokter_id));
      })
      .catch(error => console.error('Error deleting doctor:', error));
  };

  return (
    <div className="kelola-dokter">
      <div className="sidebar">
        <Link to="/AdminDashboard">Dashboard</Link>
        <Link to="/KelolaDokter">Kelola Dokter</Link>
        <Link to="/KelolaPoli">Kelola Poli</Link>
        <Link to="/KelolaPasien">Kelola Data Pasien</Link>
        <Link to="/KelolaJadwal">Kelola Jadwal</Link>
        <Link to="/RiwayatPasien">Riwayat Pasien</Link>
      </div>
      <div className="main-content">
        <h2>Kelola Dokter</h2>
        <div className="form-group">
          <label>Nama Dokter:</label>
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
        <div className="form-group">
          <label>Poliklinik:</label>
          <select
            value={polis_id}
            onChange={(e) => setPolisId(e.target.value)}
          >
            <option value="">Pilih Poliklinik</option>
            {polis.map(poli => (
              <option key={poli.polis_id} value={poli.polis_id}>{poli.nama}</option>
            ))}
          </select>
        </div>

        <KelolaDokterButton dokterEdit={dokterEdit} tambahDokter={tambahDokter} updateDokter={updateDokter} />

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Dokter</th>
              <th>Poliklinik</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dokters.map(dokter => (
              <tr key={dokter.dokter_id}>
                <td>{dokter.dokter_id}</td>
                <td>{dokter.nama}</td>
                <td>
                  {polis.find(poli => poli.polis_id === dokter.polis_id)?.nama || 'Poliklinik Tidak Ditemukan'}
                </td>
                <td>
                  <img
                    src={dokter.image.startsWith('http') ? dokter.image : `http://localhost:4000${dokter.image}`}
                    alt={dokter.nama}
                    className="dokter-image"
                    style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                  />
                </td>
                <td>
                  <button onClick={() => {
                    setDokterEdit(dokter);
                    setNama(dokter.nama);
                    setImage(dokter.image);
                    setPolisId(dokter.polis_id);
                  }}>Edit</button>
                  <button onClick={() => hapusDokter(dokter.dokter_id)}>Hapus</button>
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
