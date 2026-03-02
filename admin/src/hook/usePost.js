import { useState,useEffect } from "react"

 export const usePost = (url)=>{
   const [Data,setData] = useState(null);
   const [error,setError] = useState(null);
   const [loading,setLoading] = useState(false);

    useEffect(() => {
         const PostData = async () => {
           try {
            setLoading(true);
            const res = await fetch(url,{
            method: "POST",
            credentials: "include", 
           });
             const data = await res.json();
            setData(data);
      
           } catch (error) {
            setError(error.message || "Something went wrong");
           }finally{
              setLoading(false);
           }
         };
        PostData
         },[url])

         return {
             Data,
            error,
            loading
         }


}