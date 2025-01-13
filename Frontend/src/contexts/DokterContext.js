// DoctorContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const DoctorContext = createContext();

export const useDoctor = () => useContext(DoctorContext);

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/doctors');
        const data = await response.json();
        if (data.success) {
          setDoctors(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <DoctorContext.Provider value={{ doctors, error }}>
      {children}
    </DoctorContext.Provider>
  );
};
