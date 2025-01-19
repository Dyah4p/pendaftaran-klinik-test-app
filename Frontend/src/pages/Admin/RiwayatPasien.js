import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RiwayatPasien.css';

const KelolaAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);  // State untuk menyimpan data pengguna
  const [formData, setFormData] = useState({
    userId: '',
    nama: '',
    tanggalLahir: '',
    nomorTelepon: '',
    email: '',
    jadwalId: '',
    dokterId: '',
    polisId: '',
    status: '',
  });
  const [appointmentEdit, setAppointmentEdit] = useState(null);
  const [dokters, setDokters] = useState([]);
  const [polis, setPolis] = useState([]);
  const [jadwals, setJadwals] = useState([]);

  // Fungsi untuk menangani perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Jika dokterId berubah, fetch jadwal terkait
    if (name === 'dokterId' && value) {
      fetchJadwalsByDokter(value);
    }
  };

  // Fetch data awal (users, dokters, polis, dan appointments)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, dokterRes, poliRes, appointmentRes] = await Promise.all([
          fetch('http://localhost:4000/api/users'),  // Endpoint untuk users
          fetch('http://localhost:4000/api/doctors'),
          fetch('http://localhost:4000/api/polis'),
          fetch('http://localhost:4000/api/appointments'),
        ]);

        if (!userRes.ok || !dokterRes.ok || !poliRes.ok || !appointmentRes.ok) {
          throw new Error('Error fetching data');
        }

        const userData = await userRes.json();
        const dokterData = await dokterRes.json();
        const poliData = await poliRes.json();
        const appointmentData = await appointmentRes.json();

        setUsers(userData.data || []);  // Set data users
        setDokters(dokterData.data || []);
        setPolis(poliData.data || []);
        setAppointments(appointmentData.data || []);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  // Fetch jadwals berdasarkan dokterId
  const fetchJadwalsByDokter = async (dokterId) => {
    try {
      const res = await fetch(`http://localhost:4000/api/jadwals/${dokterId}`);
      if (!res.ok) {
        throw new Error(`Gagal fetch jadwal dengan dokterId: ${dokterId}`);
      }
      const data = await res.json();
      setJadwals(data.data || []);
    } catch (error) {
      console.error('Error fetching jadwals:', error.message);
    }
  };

  // Menambah atau memperbarui appointment
  const handleSubmit = () => {
    const url = appointmentEdit
      ? `http://localhost:4000/api/appointments/${appointmentEdit.appointment_id}`
      : 'http://localhost:4000/api/appointments';
    const method = appointmentEdit ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request gagal dengan status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setAppointments((prev) => {
            if (appointmentEdit) {
              return prev.map((item) =>
                item.appointment_id === appointmentEdit.appointment_id
                  ? data.appointment
                  : item
              );
            }
            return [...prev, data.appointment];
          });
          resetForm();
        } else {
          console.error('Error menyimpan appointment:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error menyimpan appointment:', error.message);
      });
  };

  // Menghapus appointment
  const handleDelete = (appointment_id) => {
    fetch(`http://localhost:4000/api/appointments/${appointment_id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Delete gagal dengan status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setAppointments((prev) =>
          prev.filter((item) => item.appointment_id !== appointment_id)
        );
      })
      .catch((error) => {
        console.error('Error menghapus appointment:', error.message);
      });
  };

  // Reset form setelah pengisian atau pembatalan
  const resetForm = () => {
    setFormData({
      userId: '',
      nama: '',
      tanggalLahir: '',
      nomorTelepon: '',
      email: '',
      jadwalId: '',
      dokterId: '',
      polisId: '',
      status: '',
    });
    setAppointmentEdit(null);
  };

  return (
    <div className="kelola-appointment">
      <div className="sidebar">
        <Link to="/AdminDashboard">Dashboard</Link>
        <Link to="/KelolaDokter">Kelola Dokter</Link>
        <Link to="/KelolaPoli">Kelola Poli</Link>
        <Link to="/KelolaPasien">Kelola Data Pasien</Link>
        <Link to="/KelolaJadwal">Kelola Jadwal</Link>
        <Link to="/RiwayatPasien">Riwayat Pasien</Link>
      </div>
      <div className="main-content">
        <h2>Kelola Appointment</h2>

        <div className="form-container">
          <select name="userId" value={formData.userId} onChange={handleInputChange}>
            <option value="">Pilih Pengguna</option>
            {users.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.nama}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            placeholder="Nama"
          />
          <input
            type="date"
            name="tanggalLahir"
            value={formData.tanggalLahir}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="nomorTelepon"
            value={formData.nomorTelepon}
            onChange={handleInputChange}
            placeholder="Nomor Telepon"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <select name="dokterId" value={formData.dokterId} onChange={handleInputChange}>
            <option value="">Pilih Dokter</option>
            {dokters.map((dokter) => (
              <option key={dokter.dokter_id} value={dokter.dokter_id}>
                {dokter.nama}
              </option>
            ))}
          </select>
          <select name="jadwalId" value={formData.jadwalId} onChange={handleInputChange}>
            <option value="">Pilih Jadwal</option>
            {jadwals.map((jadwal) => (
              <option key={jadwal.jadwal_id} value={jadwal.jadwal_id}>
                {jadwal.waktu}
              </option>
            ))}
          </select>
          <select name="polisId" value={formData.polisId} onChange={handleInputChange}>
            <option value="">Pilih Poliklinik</option>
            {polis.map((poli) => (
              <option key={poli.polis_id} value={poli.polis_id}>
                {poli.nama}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            placeholder="Status"
          />
          <button onClick={handleSubmit}>
            {appointmentEdit ? 'Update Appointment' : 'Tambah Appointment'}
          </button>
          {appointmentEdit && <button onClick={resetForm}>Batal</button>}
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Nama</th>
              <th>Tanggal Lahir</th>
              <th>Nomor Telepon</th>
              <th>Email</th>
              <th>Jadwal</th>
              <th>Dokter</th>
              <th>Poliklinik</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.appointment_id}>
                <td>{appointment.appointment_id}</td>
                <td>{appointment.userId}</td>
                <td>{appointment.nama}</td>
                <td>{appointment.tanggalLahir}</td>
                <td>{appointment.nomorTelepon}</td>
                <td>{appointment.email}</td>
                <td>{jadwals.find((jadwal) => jadwal.jadwal_id === appointment.jadwalId)?.waktu || 'Tidak Ditemukan'}</td>
                <td>{dokters.find((dokter) => dokter.dokter_id === appointment.dokterId)?.nama || 'Tidak Ditemukan'}</td>
                <td>{polis.find((poli) => poli.polis_id === appointment.polisId)?.nama || 'Tidak Ditemukan'}</td>
                <td>{appointment.status}</td>
                <td>
                  <button
                    onClick={() => {
                      setAppointmentEdit(appointment);
                      setFormData({ ...appointment });
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(appointment.appointment_id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KelolaAppointment;
