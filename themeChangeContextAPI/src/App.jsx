import { useEffect, useState } from 'react'
import './App.css'
import ThemeBtn from './components/ThemeBtn'
import Card from './components/Card'
import { ThemeProvider } from './contexts/Theme'

function App() {

  const [themeMode, setThemeMode] = useState("light");

  const darkTheme = () => {
    setThemeMode("dark")
  }

  const lightTheme = () => {
    setThemeMode("light")
  }

  useEffect(() => {
    const htmlTag = document.querySelector('html');
    htmlTag.classList.remove("light","dark");
    htmlTag.classList.add(themeMode); 
  },[themeMode])

  return (
    <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn/>   
          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card/>        
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
