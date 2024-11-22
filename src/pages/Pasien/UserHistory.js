import React from 'react';
import './UserHistory.css';
import BackButton from '../../components/pasienbutton/BackButton'; // Impor komponen tombol kembali

const UserHistory = () => {
    const histories = [
        { id: 1, date: '2024-11-14', doctor: 'Dr. Dyah', department: 'Poli Umum' },
        { id: 2, date: '2024-12-01', doctor: 'Dr. Garin', department: 'Poli Gigi' },
        { id: 3, date: '2025-01-15', doctor: 'Dr. Claudea', department: 'Poli THT' },
    ];

    const goToDashboard = () => {
        // Logika untuk kembali ke dashboard
        window.location.href = '/UserDashboard';
    };

    return (
        <div className="user-history">
            <h2>Riwayat Pendaftaran</h2>
            <div className="history-container">
                {histories.map((history) => (
                    <div className="history-item" key={history.id}>
                        <p><strong>Tanggal:</strong> {history.date}</p>
                        <p><strong>Dokter:</strong> {history.doctor}</p>
                        <p><strong>Poli:</strong> {history.department}</p>
                    </div>
                ))}
            </div>
            <BackButton handleBackToDashboard={goToDashboard} />
        </div>
    );
};

export default UserHistory;
