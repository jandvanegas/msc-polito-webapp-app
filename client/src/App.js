import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import EntryPage from './Components/EntryPage'
import Game from './Components/GameComponents/Game'
import Leaderboard from './Components/Leaderboard'
import NavigationBar from './Components/NavigationBar'
import Row from 'react-bootstrap/Row'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

function App() {
  const [open, setOpen] = useState(false)
  return (
    <Container fluid >
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
              <Row><NavigationBar open={open} setOpen={setOpen} /></Row>
              <Row><Game /></Row>
            </Container>
            }
          />
          <Route
            path='/leaderboard'
            element={
            <Container>
                <NavigationBar open={open} setOpen={setOpen} />
                <Leaderboard />
            </Container>
            }
          />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App
