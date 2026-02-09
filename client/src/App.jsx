
import './App.css'
import Home from './Pages/Home'
import { BrowserRouter, Routes, Route } from "react-router";
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
//import { useEffect } from 'react';
//import { useFetch } from './hooks/useFetch';


function App() {
  
   // const {data,error,loading} = useFetch('http://localhost:7000/me')
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
