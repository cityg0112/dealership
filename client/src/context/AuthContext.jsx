import { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Create the Provider component
export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);

  // Check if the admin is already logged in when the app loads
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setToken(storedToken);
      setIsAdmin(true);
    }
  }, []);

  // Function to log in (simulated for now)
  const login = (dummyToken) => {
    localStorage.setItem('adminToken', dummyToken);
    setToken(dummyToken);
    setIsAdmin(true);
  };

  // Function to log out
  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the auth context in other files
export const useAuth = () => useContext(AuthContext);