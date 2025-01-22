import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default App
