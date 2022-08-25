import 'bootstrap/dist/css/bootstrap.min.css'
import NavigationBar from './Components/NavigationBar'
import Container from 'react-bootstrap/Container'
import Game from './Components/GameComponents/Game'
import EntryPage from './Components/EntryPage'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

function App() {
  const [open, setOpen] = useState(false)
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
            <Container>
                <NavigationBar open={open} setOpen={setOpen} />
                <EntryPage />
            </Container>
            }
          />
          <Route
            path='/play'
            element={
            <Container>
                <NavigationBar open={open} setOpen={setOpen} />
                <Game />
            </Container>
            }
          />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App
