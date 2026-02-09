import { useState,useEffect } from "react"

 export const useFetch = (url)=>{
    const [data,setData]= useState(null);
     const [error,setError]= useState(null);
      const [loading,setLoading]= useState(null);
      useEffect(()=>{
            const getData = async ()=>{
                setLoading(true);
               try {
                const res = await fetch(url,{
                 method: "GET",
                credentials: "include", 
                 });
                const data = await res.json();
                console.log(data);
                setData(data);
               } catch (error) {
                setError(error.message || "Something went wrong")
               }finally{
                  setLoading(false)
               }
            }
            getData();
      },[url])

      return {
        data,
        error,
        loading
      }

}