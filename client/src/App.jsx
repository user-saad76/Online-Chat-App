
import './App.css'
import Home from './Pages/Home'
import { BrowserRouter, Routes, Route, data } from "react-router";
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import AuthProvider from './contexts/AuthProvider';

function App() {
   
  return (
    <AuthProvider>
     <BrowserRouter>
      <Routes>
      <Route path="/home" element={ <Home/>} />
      <Route path="/" element={ <Home/>} />
       <Route path="/sign-up" element={ <SignUp/>} />
       <Route path="/sign-in" element={ <SignIn/>} />
    </Routes>
  </BrowserRouter>
   </AuthProvider>
       
  )
}

export default App
