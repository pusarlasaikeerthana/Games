import { useState } from 'react'
import './App.css'
import Tic from './assets/tic-tac-toe/Tic'
import RPS from './assets/rps/RPS'
import Ludo from './assets/ludo/Ludo'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom';


function App() {

  return (
    
      <div className='container'>
        <nav>
          <ul className='navList'>
            <li >
              <Link to="/tic-tac-toe">Tic-Tac-Toe</Link>
            </li >
            <li>
              <Link to="/rock-paper-scissors">Rock-Paper-Scissors</Link>
            </li>
            <li >
              <Link to="/ludo">Ludo</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/tic-tac-toe" element={<Tic />} />
          <Route path="/rock-paper-scissors" element={<RPS />} />
          <Route path="/ludo" element={<Ludo />} />
        </Routes>
      </div>
    
  )
}

export default App
