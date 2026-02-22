import React, { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../hook/useFetch";

export const AuthContext = createContext();

function AuthProvider({ children }) {

  const { Data, error, loading } = useFetch("http://localhost:7000/user/me");
  const [user,setUser] = useState(null);

  useEffect(()=>{
   if(Data)setUser(Data);
  },[Data]);

  const logout = async () => {
    try {
      await fetch("http://localhost:7000/user/logout", {
        method: "POST",
        credentials: "include", // important if using cookies
      });

    setUser(null)
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);