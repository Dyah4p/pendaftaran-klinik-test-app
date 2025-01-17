import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './KelolaPasien.css';
import KelolaPasienButton from '../../components/adminbutton/KelolaPasienButton';

const KelolaPasien = () => {
  const [pasien, setPasien] = useState([]);
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [email, setEmail] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [pasienEdit, setPasienEdit] = useState(null);

  // Fetch data pasien dari backend
  useEffect(() => {
    fetch('http://localhost:4000/api/user_profiles')
      .then((response) => response.json())
      .then((data) => {
        // Pastikan bahwa data dan data.data ada, dan data.data adalah array
        if (data && data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
          setPasien(data.data); // Menyimpan data pasien
        } else {
          console.error('Data pasien tidak valid', data);
        }
      })
      .catch((error) => console.error('Error fetching pasien:', error));
  }, []);
  

  // Fungsi untuk menambahkan pasien
  const tambahPasien = () => {
    const pasienBaru = { nama, alamat, nomorTelepon, email, tanggalLahir };

    fetch('http://localhost:4000/api/user_profiles/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pasienBaru),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPasien([...pasien, data.pasien]);
          setNama('');
          setAlamat('');
          setNomorTelepon('');
          setEmail('');
          setTanggalLahir('');
        } else {
          console.error('Error adding pasien:', data.message);
        }
      })
      .catch((error) => console.error('Error adding pasien:', error));
  };

  // Fungsi untuk mengupdate pasien
  const updatePasien = () => {
    const pasienUpdated = { nama, alamat, nomorTelepon, email, tanggalLahir };

    fetch(`http://localhost:4000/api/user_profiles/update/${pasienEdit.id_profil}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pasienUpdated),
    })
      .then(() => {
        const updatedPasien = pasien.map((p) =>
          p.id_profil === pasienEdit.id_profil
            ? { ...p, nama, alamat, nomorTelepon, email, tanggalLahir }
            : p
        );
        setPasien(updatedPasien);
        setPasienEdit(null);
        setNama('');
        setAlamat('');
        setNomorTelepon('');
        setEmail('');
        setTanggalLahir('');
      })
      .catch((error) => console.error('Error updating pasien:', error));
  };

  // Fungsi untuk menghapus pasien
  const hapusPasien = (id_profil) => {
    fetch(`http://localhost:4000/api/user_profiles/delete/${id_profil}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPasien(pasien.filter((p) => p.id_profil !== id_profil));
      })
      .catch((error) => console.error('Error deleting pasien:', error));
  };

  return (
    <div className="kelola-pasien">
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
        <h2>Kelola Data Pasien</h2>
        <div className="form-group">
          <label>Nama Pasien:</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Alamat:</label>
          <input
            type="text"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>No. Telepon:</label>
          <input
            type="text"
            value={nomorTelepon}
            onChange={(e) => setNomorTelepon(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Tanggal Lahir:</label>
          <input
            type="date"
            value={tanggalLahir}
            onChange={(e) => setTanggalLahir(e.target.value)}
          />
        </div>

        <KelolaPasienButton pasienEdit={pasienEdit} tambahPasien={tambahPasien} updatePasien={updatePasien} />

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Pasien</th>
              <th>Alamat</th>
              <th>No. Telepon</th>
              <th>Email</th>
              <th>Tanggal Lahir</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pasien.map((p) => (
              <tr key={p.id_profil}>
                <td>{p.id_profil}</td>
                <td>{p.nama}</td>
                <td>{p.alamat}</td>
                <td>{p.nomor_telepon}</td>
                <td>{p.email}</td>
                <td>{new Date(p.tanggal_lahir).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => {
                      setPasienEdit(p);
                      setNama(p.nama);
                      setAlamat(p.alamat);
                      setNomorTelepon(p.nomor_telepon);
                      setEmail(p.email);
                      setTanggalLahir(p.tanggal_lahir.substring(0, 10)); // Format tanggal menjadi YYYY-MM-DD
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => hapusPasien(p.id_profil)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KelolaPasien;
