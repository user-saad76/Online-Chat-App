

import './App.css'
import Home from './Pages/Home'
import { BrowserRouter, Routes, Route, data } from "react-router";
import SignUp from './Pages/SignUp';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from './Pages/SignIn';
import AuthAdminProvider from './contexts/AuthAdminProvider';
import Chats from './Pages/Chats';
import SendChats from './Pages/SendChats';



function App() {

 
  return (
    <>
    <AuthAdminProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/chats" element={<Chats/>} />
           <Route path="/sent-messages" element={<SendChats/>} />
        </Routes>
      </BrowserRouter>
      {/* Toast container outside router is fine as long as it’s inside root fragment */}
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthAdminProvider>
  
    </>
  )
}

export default App
