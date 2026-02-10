
import './App.css'
import Home from './Pages/Home'
import { BrowserRouter, Routes, Route, data } from "react-router";
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import { useEffect, useState } from 'react';


function App() {
   
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
      
      setMessages(data.messages);
    } catch (err) {
      console.log(err);
    }
  };
  fetchUser();
  },[])

 
  return (
    
     <BrowserRouter>
      <Routes>
      <Route path="/home" element={ <Home/>} />
      <Route path="/" element={ <Home/>} />
       <Route path="/sign-up" element={ <SignUp/>} />
       <Route path="/sign-in" element={ <SignIn/>} />
    </Routes>
  </BrowserRouter>
       
  )
}

export default App
