import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './KelolaPasien.css';
import KelolaPasienButton from '../../components/adminbutton/KelolaPasienButton'; // Impor komponen tombol

const KelolaPasien = () => {
  const [pasien, setPasien] = useState([]);
  const [nama, setNama] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');
  const [pasienEdit, setPasienEdit] = useState(null);

  useEffect(() => {
    const storedPasien = JSON.parse(localStorage.getItem('dataPasien')) || [];
    setPasien(storedPasien);
    console.log('Data pasien yang diambil di admin:', storedPasien);
  }, []);

  useEffect(() => {
    localStorage.setItem('dataPasien', JSON.stringify(pasien));
    console.log('Data pasien yang disimpan:', pasien);
  }, [pasien]);

  const tambahPasien = () => {
    const pasienBaru = { id: Date.now(), nama, tanggalLahir, nomorTelepon, email, alamat, created_at: new Date().toISOString() };
    setPasien([...pasien, pasienBaru]);
    setNama('');
    setTanggalLahir('');
    setNomorTelepon('');
    setEmail('');
    setAlamat('');
    console.log('Pasien baru ditambahkan:', pasienBaru);
  };

  const updatePasien = () => {
    const pasienDiperbarui = pasien.map(p =>
      p.id === pasienEdit.id ? { ...p, nama, tanggalLahir, nomorTelepon, email, alamat, created_at: pasienEdit.created_at } : p
    );
    setPasien(pasienDiperbarui);
    setPasienEdit(null);
    setNama('');
    setTanggalLahir('');
    setNomorTelepon('');
    setEmail('');
    setAlamat('');
    console.log('Pasien diupdate:', pasienDiperbarui);
  };

  const hapusPasien = (id) => {
    const pasienDiperbarui = pasien.filter(p => p.id !== id);
    setPasien(pasienDiperbarui);
    console.log('Pasien dihapus, ID:', id);
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
          <label>Nama:</label>
          <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Tanggal Lahir:</label>
          <input type="date" value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Nomor Telepon:</label>
          <input type="text" value={nomorTelepon} onChange={(e) => setNomorTelepon(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Alamat:</label>
          <input type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
        </div>
        <KelolaPasienButton pasienEdit={pasienEdit} tambahPasien={tambahPasien} updatePasien={updatePasien} />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Tanggal Lahir</th>
              <th>Nomor Telepon</th>
              <th>Email</th>
              <th>Alamat</th>
              <th>Created At</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pasien.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nama}</td>
                <td>{p.tanggalLahir}</td>
                <td>{p.nomorTelepon}</td>
                <td>{p.email}</td>
                <td>{p.alamat}</td>
                <td>{p.created_at}</td>
                <td>
                  <button onClick={() => {
                    setPasienEdit(p);
                    setNama(p.nama);
                    setTanggalLahir(p.tanggalLahir);
                    setNomorTelepon(p.nomorTelepon);
                    setEmail(p.email);
                    setAlamat(p.alamat);
                  }}>Edit</button>
                  <button onClick={() => hapusPasien(p.id)}>Hapus</button>
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
