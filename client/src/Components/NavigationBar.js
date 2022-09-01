import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom'

function NavigationBar(props) {
  const { loggedIn, handleLogout, open, setOpen } = props
  const navigate = useNavigate()
  const logIn = () => {
    navigate('/login')
  }
  const logOut = () => {
    handleLogout()
    navigate('/')
  }
  return (
    <Navbar bg='primary' variant='dark'>
      <Container>
        <Button
          className='d-md-none'
          aria-controls='side-bar'
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className='navbar-toggler-icon'></span>
        </Button>
        <Navbar.Brand>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-joystick'
            viewBox='0 0 16 16'
          >
            <path d='M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2z' />
            <path d='M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23z' />
          </svg>
        </Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link href='/#'>Home</Nav.Link>
          <Nav.Link href='/leaderboard#'>Hall of Fame</Nav.Link>
          { loggedIn && (
            <Nav.Link href='/history#'>My Scores</Nav.Link>
          )}
        </Nav>

        {loggedIn && (
          <Button onClick={logOut}>Log Out &nbsp;</Button>
        )}

        {!loggedIn && (
          <Button onClick={logIn}>Log In &nbsp;</Button>
        )}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          fill='white'
          className='bi bi-person-circle'
          viewBox='0 0 16 16'
        >
          <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
          <path
            fillRule='evenodd'
            d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
          />
        </svg>
      </Container>
    </Navbar>
  )
}
export default NavigationBar
