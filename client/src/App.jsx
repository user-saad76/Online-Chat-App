
import './App.css'
import Home from './Pages/Home'
import { BrowserRouter, Routes, Route } from "react-router";
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';


function App() {
  

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
