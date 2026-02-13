import React,{createContext} from "react";
import { useContext } from "react";
import { useFetch } from "../hook/useFetch";

export const AuthContext = createContext();


function AuthProvider({children}) {

    const {Data:user,error,loading} =  useFetch("http://localhost:7000/user/me");
 
   return(
      <AuthContext.Provider value={{user,error,loading}}>
        {children}
      </AuthContext.Provider>
   ) 
}
export default AuthProvider

 export const useAuth = ()=> useContext(AuthContext)