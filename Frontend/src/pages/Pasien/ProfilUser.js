import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext'; // Mengambil hook useUser dari context
import SaveButton from '../../components/pasienbutton/SaveButton';
import LogoutButton from '../../components/pasienbutton/LogoutButton';
import './ProfilUser.css';

const ProfilUser = () => {
  const { user, setUser } = useUser(); // Mendapatkan user dan setUser dari context
  const [userData, setUserData] = useState({
    nama: '',
    tanggalLahir: '',
    nomorTelepon: '',
    email: '',
    alamat: ''
  });
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false); // State untuk menyimpan status apakah data sudah disimpan
  const navigate = useNavigate();

  const userId = user ? user.user_id : null; // Mendapatkan user_id dari context

  useEffect(() => {
    if (!user) {
      setError('User belum login!');
    } else {
      // Ambil profil pengguna berdasarkan user_id
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/user_profiles`);
          const data = await response.json();
          console.log('Data dari API:', data);  // Log data dari API
          if (data.status === 'success') {
            setUserData(data.data);
          } else {
            setError('Gagal mengambil profil pengguna');
          }
        } catch (error) {
          setError(`Error mengambil profil pengguna: ${error.message}`);
        }
      };
      fetchUserProfile();
    }
  }, [user, userId]); // Menjalankan kembali efek ketika user atau userId berubah

  // Fungsi untuk logout
  const handleLogout = () => {
    setUser(null); // Menghapus informasi user saat logout
    navigate('/Home'); // Ubah dengan halaman tujuan setelah logout
  };

  // Fungsi untuk menangani perubahan input pengguna
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => {
      const updatedData = { ...prevState, [name]: value };
      console.log('Data yang diperbarui:', updatedData);  // Log data yang diubah
      return updatedData;
    });
  };

  // Fungsi untuk menyimpan data pengguna (dikirim ke server dan disimpan di database)
  const handleSave = async () => {
    if (!userId) {
      setError('User belum login!');
      return;
    }

    try {
      const payload = {
        user_id: userId, // Menambahkan user_id dari context
        nama: userData.nama,
        tanggal_lahir: userData.tanggalLahir,
        nomor_telepon: userData.nomorTelepon,
        email: userData.email,
        alamat: userData.alamat,
        updated_at: new Date().toISOString(), // Menambahkan updated_at untuk pembaruan data
      };

      console.log('Payload yang dikirim:', payload); // Log payload

      const response = await fetch(`http://localhost:4000/api/user_profiles/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setUserData(data.data); // Perbarui state userData dengan data terbaru
        setSaved(true); // Tampilkan status berhasil
        setError(''); // Hapus pesan error jika berhasil menyimpan
        console.log('Data berhasil disimpan:', data.data); // Log data yang disimpan
      } else {
        setError(data.message || 'Gagal memperbarui profil pengguna.');
        console.error(`Gagal memperbarui profil pengguna: ${data.message}`);
      }
    } catch (error) {
      setError(`Error menyimpan data pengguna: ${error.message}`);
      console.error(`Error menyimpan data pengguna: ${error.message}`);
    }
  };

  return (
    <div className="profil-user">
      <h2>Profil Pengguna</h2>
      {error && <p className="error">{error}</p>}
      {saved && <p className="success">Data berhasil disimpan!</p>} {/* Pesan jika data berhasil disimpan */}
      <div className="profil-info">
        <label>Nama:</label>
        <input
          type="text"
          name="nama"
          value={userData.nama}
          onChange={handleChange}
        />
      </div>
      <div className="profil-info">
        <label>Tanggal Lahir:</label>
        <input
          type="date"
          name="tanggalLahir"
          value={userData.tanggalLahir}
          onChange={handleChange}
        />
      </div>
      <div className="profil-info">
        <label>Nomor Telepon:</label>
        <input
          type="text"
          name="nomorTelepon"
          value={userData.nomorTelepon}
          onChange={handleChange}
        />
      </div>
      <div className="profil-info">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </div>
      <div className="profil-info">
        <label>Alamat:</label>
        <input
          type="text"
          name="alamat"
          value={userData.alamat}
          onChange={handleChange}
        />
      </div>
      {/* Menampilkan user_id di halaman */}
      {userId && (
        <div className="profil-info">
          <label>User ID:</label>
          <p>{userId}</p>
        </div>
      )}
      <SaveButton handleSave={handleSave} />
      <LogoutButton handleLogout={handleLogout} />
    </div>
  );
};

export default ProfilUser;
