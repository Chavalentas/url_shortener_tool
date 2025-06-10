import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from "./components/home/home"
import UrlPage from "./components/url-page/url-page"

function App() {
  return (
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/:urlKey" element={<UrlPage/>}/>
       </Routes>
    </BrowserRouter>
  );
}

export default App
