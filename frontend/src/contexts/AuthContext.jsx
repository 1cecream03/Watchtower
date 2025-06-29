import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("ACCESS_TOKEN"));

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("ACCESS_TOKEN");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const login = () => setIsLoggedIn(true);

  const logout = () => {
    // Clear tokens
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");

    // Clear any cached movie data or reviews
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("movie-")) {
        localStorage.removeItem(key);
      }
    });

    // Set login state
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
