import React, { createContext, useContext, useState} from 'react';

const JadwalContext = createContext();

export const useJadwal = () => {
  const context = useContext(JadwalContext);
  if (!context) {
    throw new Error('useJadwal must be used within a JadwalProvider');
  }
  return context;
};

export const JadwalProvider = ({ children }) => {
  const [jadwals, setJadwals] = useState([]);

  // Fetch jadwal berdasarkan dokter_id
  const fetchJadwalByDokterId = async (dokter_id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/jadwals/${dokter_id}`);
      const data = await response.json();
      if (data.status === 'success') {
        setJadwals(data.data); // Menyimpan data jadwal berdasarkan dokter_id
      } else {
        console.error('Error fetching jadwals:', data.message);
      }
    } catch (error) {
      console.error('Error fetching jadwals:', error);
    }
  };

  return (
    <JadwalContext.Provider value={{ jadwals, fetchJadwalByDokterId }}>
      {children}
    </JadwalContext.Provider>
  );
};
