import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

// Provider component to wrap our app
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]); 

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
