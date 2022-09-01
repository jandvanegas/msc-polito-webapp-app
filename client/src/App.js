import 'bootstrap/dist/css/bootstrap.min.css'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Collapse from 'react-bootstrap/Collapse'
import EntryPage from './Components/EntryPage'
import Game from './Components/GameComponents/Game'
import Leaderboard from './Components/Leaderboard'
import LoginPage from './Components/Auth'
import UserHistory from './Components/UserHistory'
import DefaultRoute from './Components/DefaultRoute'
import Page from './Components/Page'
import Api from './Api'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [logginInMessage, setLoggingInMessage] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const [score, setScore] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      const user = await Api.getUserInfo()
      if (user) {
        setLoggedIn(true)
      }
    }
    checkAuth()
  }, [])

  useEffect(() => {
    const autocloseAlert = async () => {
      if (logginInMessage) {
        setTimeout(() => {
          setLoggingInMessage('')
          setOpenAlert(false)
        }, 3000)
      }
    }
    autocloseAlert()
  }, [logginInMessage])

  const handleLogin = async (credentials) => {
    setOpenAlert(true)
    try {
      const user = await Api.logIn(credentials)
      setLoggedIn(true)
      setLoggingInMessage({ msg: `Welcome, ${user.name}!`, type: 'success' })
    } catch (err) {
      setLoggingInMessage({
        msg: 'Incorrect user name or password',
        type: 'danger',
      })
    }
  }

  const handleLogout = async () => {
    await Api.logOut()
    setLoggedIn(false)
  }

  return (
    <Container fluid>
      <Collapse in={openAlert}>
        <Alert
          variant={logginInMessage.type}
          onClose={() => {
            setLoggingInMessage('')
            setOpenAlert(false)
          }}
          dismissible
          show={openAlert}
        >
          <span className='text-center'> {logginInMessage.msg}</span>
        </Alert>
      </Collapse>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Page loggedIn={loggedIn} handleLogout={handleLogout} />}
          >
            <Route path='' element={<EntryPage loggedIn={loggedIn} />} />
            <Route
              path='play'
              element={
                <Game
                  loggedIn={loggedIn}
                  setScore={setScore}
                  score={score}
                />
              }
            />
            <Route path='leaderboard' element={<Leaderboard />} />
            <Route path='history' element={<UserHistory loggedIn={loggedIn}/>} />
            <Route path='*' element={<DefaultRoute />} />
            <Route
              path='login'
              element={<LoginPage login={handleLogin} loggedIn={loggedIn} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App
