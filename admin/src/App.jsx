

import './App.css'
import Home from './Pages/Home'
import { BrowserRouter, Routes, Route, data } from "react-router";
import SignUp from './Pages/SignUp';

function App() {
  

  return (
   <BrowserRouter>
      <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/" element={<Home/>} />
       <Route path="/sign-up" element={<SignUp/>} />
       
    </Routes>
  </BrowserRouter>
  )
}

export default App
