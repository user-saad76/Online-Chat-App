import Dashboard from "../Components/Dashboard"
import Navbar from "../Components/Navbar"
import { useEffect, useState } from 'react';

function Home() {
  
    return(
        <>
          <Navbar/>
          <Dashboard/>
        </>
    )
}
export default Home