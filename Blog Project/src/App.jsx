import { useDispatch, useSelector } from 'react-redux'
import React ,{ useEffect } from 'react'
import './App.css'
import { login, logout } from './store/authSlice';
import authService from './appwrite/auth';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const dispatch = useDispatch()
  const loginStatus = useSelector((state) => state.auth.status)


  useEffect(() => {
    if (!loginStatus) {
      return
    }
    else {
      authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        }
        else dispatch(logout());
      })
    }
  },[])


  return ( 
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
        <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  )
}

export default App
