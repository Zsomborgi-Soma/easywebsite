import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MainPage from './MainPage'
import './assets/bootstrap.min.css';
import "./Ads.jsx"
import Ads from './Ads.jsx';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="offers" element={<Ads/>} />
          <Route path="*" element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
