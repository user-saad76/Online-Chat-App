import React,{createContext} from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext();

function AuthProvider({children}) {
     const [user, setUser] = useState(null);
      const [messages, setMessages] = useState([]);
        useEffect(() => {
       const fetchUser = async () => {
         try {
          const res = await fetch("http://localhost:7000/user/me",{
          method: "GET",
          credentials: "include", // ⭐ cookie (jwt-token) will be sent
         });
           const data = await res.json();
           console.log('user',data);
          
          setUser(data.data); // 👈 full user
         setMessages(data.data?.messages || []);
    
         } catch (err) {
           console.log(err);
         }
       };
       fetchUser();
       },[])
   return(
      <AuthContext.Provider value={{user}}>
        {children}
      </AuthContext.Provider>
   ) 
}
export default AuthProvider

 export const useAuth = ()=> useContext(AuthContext)