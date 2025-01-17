import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext'; // Hook untuk context
import SaveButton from '../../components/pasienbutton/SaveButton';
import LogoutButton from '../../components/pasienbutton/LogoutButton';
import './ProfilUser.css';

const ProfilUser = () => {
  const { user, setUser } = useUser();
  const [userData, setUserData] = useState({
    user_id: '',
    nama: '',
    tanggal_lahir: '',
    nomor_telepon: '',
    email: '',
    alamat: '',
    created_at: '',
  });
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = user ? user.user_id : null;

  const formatDate = (date) => {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;  // Format: yyyy-mm-dd
  };

  useEffect(() => {
    if (!user) {
      setError('User belum login!');
      setLoading(false);
    } else {
      const fetchUserProfile = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:4000/api/user_profiles/${userId}`);
          const data = await response.json();

          if (data.status === 'success' && data.data) {
            setUserData({
              user_id: data.data.user_id || '',
              nama: data.data.nama || '',
              tanggal_lahir: formatDate(data.data.tanggal_lahir) || '',
              nomor_telepon: data.data.nomor_telepon || '',
              email: data.data.email || '',
              alamat: data.data.alamat || '',
              created_at: data.data.created_at || '',
            });
            setError('');
          } else {
            setError('Profil pengguna tidak ditemukan.');
          }
        } catch (error) {
          setError(`Error mengambil profil pengguna: ${error.message}`);
        } finally {
          setLoading(false);
        }
      };
      fetchUserProfile();
    }
  }, [user, userId]);

  const handleLogout = () => {
    setUser(null);
    navigate('/UserDashboard');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    if (!userId) {
      setError('User belum login!');
      return;
    }

    try {
      const payload = {
        nama: userData.nama,
        tanggal_lahir: userData.tanggal_lahir, // Pastikan tanggal disimpan dalam format yang benar
        nomor_telepon: userData.nomor_telepon,
        email: userData.email,
        alamat: userData.alamat,
      };

      const response = await fetch(`http://localhost:4000/api/user_profiles/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setSaved(true);
        setError('');
        // Pastikan state diperbarui untuk menampilkan tanggal lahir yang baru disimpan
        setUserData((prevState) => ({
          ...prevState,
          tanggal_lahir: userData.tanggal_lahir,  // Tetap simpan tanggal lahir yang baru
        }));
      } else {
        setError(data.message || 'Gagal memperbarui profil pengguna.');
      }
    } catch (error) {
      setError(`Error menyimpan data pengguna: ${error.message}`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profil-user">
      <h2>Profil Pengguna</h2>
      {error && <p className="error">{error}</p>}
      {saved && <p className="success">Data berhasil disimpan!</p>}
      <div className="profil-info">
        <label>Nama:</label>
        <input
          type="text"
          name="nama"
          value={userData.nama || ''}
          onChange={handleChange}
        />
      </div>
      <div className="profil-info">
        <label>Tanggal Lahir:</label>
        <input
          type="date"
          name="tanggal_lahir"
          value={userData.tanggal_lahir || ''}
          onChange={handleChange}
        />
      </div>
      <div className="profil-info">
        <label>Nomor Telepon:</label>
        <input
          type="text"
          name="nomor_telepon"
          value={userData.nomor_telepon || ''}
          onChange={handleChange}
        />
      </div>
      <div className="profil-info">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email || ''}
          onChange={handleChange}
        />
      </div>
      <div className="profil-info">
        <label>Alamat:</label>
        <input
          type="text"
          name="alamat"
          value={userData.alamat || ''}
          onChange={handleChange}
        />
      </div>
      <SaveButton handleSave={handleSave} />
      <LogoutButton handleLogout={handleLogout} />
    </div>
  );
};

export default ProfilUser;
