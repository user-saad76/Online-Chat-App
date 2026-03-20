import React, { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../hook/useFetch";

export const AuthContext = createContext();

function AuthAdminProvider({ children }) {

  const { Data, error, loading } = useFetch("http://localhost:7000/admin");
  const [admin,setAdmin] = useState(null);

  useEffect(()=>{
   if(Data)setAdmin(Data);
  },[Data]);

  const logout = async () => {
    try {
      await fetch("http://localhost:7000/admin/logout", {
        method: "POST",
        credentials: "include", // important if using cookies
      });

    setAdmin(null)
      window.location.href = '/sign-in'
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ admin, error, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthAdminProvider;

export const useAuth = () => useContext(AuthContext);