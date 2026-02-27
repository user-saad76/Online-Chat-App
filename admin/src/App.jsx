

import './App.css'
import Home from './Pages/Home'
import { BrowserRouter, Routes, Route, data } from "react-router";
import SignUp from './Pages/SignUp';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>

      {/* Toast container outside router is fine as long as it’s inside root fragment */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
