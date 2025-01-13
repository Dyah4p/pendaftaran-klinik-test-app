import React, { createContext, useState, useContext } from 'react';

// Membuat Context untuk Poli
const PoliContext = createContext();

export const usePoli = () => {
  return useContext(PoliContext);
};

export const PoliProvider = ({ children }) => {
  const [polisId, setPolisId] = useState(null);

  return (
    <PoliContext.Provider value={{ polisId, setPolisId }}>
      {children}
    </PoliContext.Provider>
  );
};
