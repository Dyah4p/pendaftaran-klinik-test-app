import React, { createContext, useState, useContext } from 'react';

// Membuat UserContext
const UserContext = createContext();

// Hook untuk mengakses context
export const useUser = () => useContext(UserContext);

// Komponen Provider untuk menyediakan UserContext ke seluruh aplikasi
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Menyimpan informasi user

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
