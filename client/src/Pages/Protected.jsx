import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider"


function Protected({children}) {
    const {user,error,loading} = useAuth();

    if(loading) return <h1>Loading....</h1>
    if(error) return <h1>Something went wrong</h1>
    if(!user)  return <Navigate to ={'/sign-in'} replace/>
    return children
    
}
export default Protected