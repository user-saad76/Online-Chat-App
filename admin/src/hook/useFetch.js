import { useState,useEffect } from "react"

 export const useFetch = (url)=>{
   const [Data,setData] = useState(null);
   const [error,setError] = useState(null);
   const [loading,setLoading] = useState(false);

    useEffect(() => {
         const getData = async () => {
           try {
            setLoading(true);
            const res = await fetch(url,{
            method: "GET",
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
         getData();
         },[url])

         return {
            Data,
            error,
            loading
         }


}