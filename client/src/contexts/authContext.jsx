import React, { createContext, useState, useEffect } from "react";

// Create Auth Context
export const AuthContext = createContext({
  id: 1,
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Initialize state with localStorage data
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  // Function to update auth state
  const updateAuth = (newAuth) => {
    setAuth(newAuth);
    if (newAuth) {
      localStorage.setItem("auth", JSON.stringify(newAuth));
    } else {
      localStorage.removeItem("auth");
    }
  };

  // Listen for storage events
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "auth") {
        setAuth(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
