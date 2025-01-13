import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePoli } from '../../contexts/PoliContext'; // Mengimpor PoliContext
import './PilihPoli.css';

const PilihPoli = () => {
    const { setPolisId } = usePoli(); // Mengambil setPolisId dari PoliContext
    const [polis, setPolis] = useState([]); // Menyimpan data poli
    const [error, setError] = useState(''); // Menyimpan pesan error
    const navigate = useNavigate();

    useEffect(() => {
        // Mengambil data semua poli dari backend
        const fetchPolis = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/polis'); // URL endpoint backend
                const data = await response.json();
                if (data.success) {
                    setPolis(data.data); // Simpan data poli ke state
                } else {
                    setError(data.message); // Tampilkan pesan error jika data gagal diambil
                }
            } catch (error) {
                setError(`Error fetching polis data: ${error.message}`); // Tampilkan pesan error jaringan
            }
        };
        fetchPolis();
    }, []);

    const handlePoliSelect = async (polis_id) => {
        // Fungsi ketika poli dipilih
        setPolisId(polis_id); // Menyimpan polisId di konteks
        navigate(`/PilihDokter/${polis_id}`); // Navigasi ke halaman pilih dokter
    };

    const handleBackToDashboard = () => {
        navigate('/UserDashboard'); // Navigasi kembali ke dashboard
    };

    return (
        <div className="pilih-poli">
            <h2>Pilih Poli</h2>
            {error && <p className="error">{error}</p>} {/* Menampilkan pesan error jika ada */}
            <div className="poli-container">
                {polis.length > 0 ? (
                    polis.map((poli) => (
                        <div key={poli.polis_id} className="poli-card" onClick={() => handlePoliSelect(poli.polis_id)}>
                            <img 
                                src={poli.image} 
                                alt={poli.nama} 
                                className="poli-image" 
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} 
                            />
                            <p>{poli.nama}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-data">Tidak ada data poli tersedia.</p>
                )}
            </div>
            <button className="back-button" onClick={handleBackToDashboard}>Kembali</button>
        </div>
    );
};

export default PilihPoli;
