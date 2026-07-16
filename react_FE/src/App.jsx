import React,{ useState } from 'react'
import { RouterProvider } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import AppRouter from './router/index'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <AppRouter />
    </div>
  )
}

export default App
