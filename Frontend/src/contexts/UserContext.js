import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fungsi logout
  const logout = () => {
    localStorage.removeItem('authToken'); // Hapus token autentikasi
    localStorage.removeItem('userId'); // Hapus ID user yang tersimpan (jika ada)
    setUser(null); // Reset data user di state
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
