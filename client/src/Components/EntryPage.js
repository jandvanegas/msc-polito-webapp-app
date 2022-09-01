import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'

function EntryPage(props) {
  const navigate = useNavigate()
  const { loggedIn } = props
  const startGame = () => {
    navigate('/play')
  }
  const logIn = () => {
    navigate('/login')
  }
  return (
    <Container>
      <Row className='d-flex justify-items-between my-3'>
        <Col xs={1} sm={2} md={4} />
        <Col>
          <Image fluid src='./images/logo.png' />
        </Col>
        <Col xs={1} sm={2} md={4} />
      </Row>
      <Row className='d-flex justify-items-between my-3'>
        <Col xs={1} sm={2} md={4} />
        <Col className='d-flex justify-content-center'>
          <Button className='mx-2' onClick={startGame} variant='primary'>
            Play
          </Button>
          {!loggedIn && (
            <Button
              className='btn-secondary mx-2'
              onClick={logIn}
              variant='primary'
            >
              Log In
            </Button>
          )}
        </Col>
        <Col xs={1} sm={2} md={4} />
      </Row>
    </Container>
  )
}

export default EntryPage
