import React, { createContext, useContext, useState, useEffect } from 'react';

const DokterContext = createContext();

export const useDokter = () => {
  return useContext(DokterContext);
};

export const DokterProvider = ({ children }) => {
  const [dokters, setDokters] = useState([]);

  useEffect(() => {
    const fetchDokters = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/doctors');
        const data = await response.json();

        // Pastikan data yang diterima memiliki properti "data" dan berbentuk array
        if (data && Array.isArray(data.data)) {
          setDokters(data.data);
        } else {
          console.error('Data dokter tidak valid:', data);
        }
      } catch (error) {
        console.error('Error fetching dokters:', error);
      }
    };

    fetchDokters();
  }, []);

  return (
    <DokterContext.Provider value={{ dokters }}>
      {children}
    </DokterContext.Provider>
  );
};
