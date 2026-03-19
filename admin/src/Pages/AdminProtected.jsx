import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthAdminProvider";


function AdminProtected({children}) {
    const {admin,loading,error} = useAuth();

    if(loading) return <h1>Loading....</h1>
    if(error) return <h1>Something went wrong</h1>
    //if(admin) return <Navigate to ={'/home'} replace/>
    if(!admin) return <Navigate to ={'/sign-in'} replace/>
   
    return children
    
}
export default  AdminProtected