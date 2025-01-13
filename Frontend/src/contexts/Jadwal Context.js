// ScheduleContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ScheduleContext = createContext();

export const useSchedule = () => useContext(ScheduleContext);

export const ScheduleProvider = ({ children }) => {
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/appointments');
        const data = await response.json();
        if (data.success) {
          setSchedules(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSchedules();
  }, []);

  return (
    <ScheduleContext.Provider value={{ schedules, error }}>
      {children}
    </ScheduleContext.Provider>
  );
};
