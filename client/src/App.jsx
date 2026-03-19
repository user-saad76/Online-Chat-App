
import './App.css'
import Home from './Pages/Home'
import { BrowserRouter, Routes, Route, data } from "react-router";
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import AuthProvider from './contexts/AuthProvider';
import Profilepage from './Pages/Profilepage';
import Protected from './Pages/Protected';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './Components/Dashboard';

function App() {
   
  return (
    <AuthProvider>
     <BrowserRouter>
      <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/" element={<Protected><Home/></Protected>} />
       <Route path="/sign-up" element={ <SignUp/>} />
       <Route path="/sign-in" element={ <SignIn/>} />
        <Route path="/profile-page" element={ <Protected><Profilepage/></Protected>} />
    </Routes>
  </BrowserRouter>
  <ToastContainer position="top-right" autoClose={3000} />
   </AuthProvider>
       
  )
}

export default App
