import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import EntryPage from './Components/EntryPage'
import Game from './Components/GameComponents/Game'
import Leaderboard from './Components/Leaderboard'
import NavigationBar from './Components/NavigationBar'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import LoginPage from './Components/Auth'
import UserHistory from './Components/UserHistory'
import DefaultRoute from './Components/DefaultRoute'
import Api from './Api'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './App.css'

function App() {
  const [open, setOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [logginInMessage, setLoggingInMessage] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      const user = await Api.getUserInfo()
      if (user) {
        setLoggedIn(true)
      }
    }
    checkAuth()
  }, [])

  const handleLogin = async (credentials) => {
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
    setLoggingInMessage('')
  }
  return (
    <Container fluid>
      {logginInMessage && (
        <Row>
          <Alert
            variant={logginInMessage.type}
            onClose={() => setLoggingInMessage('')}
            dismissible
          >
            {logginInMessage.msg}
          </Alert>
        </Row>
      )}
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Container>
                <NavigationBar
                  open={open}
                  setOpen={setOpen}
                  loggedIn={loggedIn}
                  handleLogout={handleLogout}
                />
                <EntryPage loggedIn={loggedIn} />
              </Container>
            }
          />
          <Route
            path='/play'
            element={
              <Container>
                <Row>
                  <NavigationBar
                    open={open}
                    setOpen={setOpen}
                    loggedIn={loggedIn}
                    handleLogout={handleLogout}
                  />
                </Row>
                <Row>
                  <Game loggedIn={loggedIn} />
                </Row>
              </Container>
            }
          />
          <Route
            path='/login'
            element={
              loggedIn ? (
                <Navigate replace to='/' />
              ) : (
                <Container>
                  <Row>
                    <NavigationBar
                      open={open}
                      setOpen={setOpen}
                      loggedIn={loggedIn}
                      handleLogout={handleLogout}
                    />
                  </Row>
                  <Row>
                    <LoginPage login={handleLogin} />
                  </Row>
                </Container>
              )
            }
          />
          <Route
            path='/leaderboard'
            element={
              <Container>
                <NavigationBar
                  open={open}
                  setOpen={setOpen}
                  loggedIn={loggedIn}
                  handleLogout={handleLogout}
                />
                <Leaderboard />
              </Container>
            }
          />
          <Route
            path='/history'
            element={
              <Container>
                <Row>
                  <NavigationBar
                    open={open}
                    setOpen={setOpen}
                    loggedIn={loggedIn}
                    handleLogout={handleLogout}
                  />
                </Row>
                <Row>
                  <UserHistory />
                </Row>
              </Container>
            }
          />
          <Route
            path='*'
            element={
              <Container>
                <Row>
                  <NavigationBar
                    open={open}
                    setOpen={setOpen}
                    loggedIn={loggedIn}
                    handleLogout={handleLogout}
                  />
                </Row>
                <Row>
                  <DefaultRoute />
                </Row>
              </Container>
            }
          />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App
