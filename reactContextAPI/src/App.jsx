import './App.css'
import UserContextProvider from './context/UserContextProvider'
import Login from './components/Login'
import Profile from './components/Profile'

function App() {

  return (
    <UserContextProvider>
      <h1>Click on the Vite and React logos to learn more</h1>
      <Login/>
      <Profile/>
    </UserContextProvider>
  )
}

export default App
