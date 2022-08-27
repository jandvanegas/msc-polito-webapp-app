import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'

function EntryPage() {
  const navigate = useNavigate()
  const startGame = () => {
    navigate('/play')
  }

  return (
    <Container>
      <Row className='d-flex justify-items-between my-3'>
        <Col />
        <Col>
          <Image fluid src='./images/logo.png' />
        </Col>
        <Col />
      </Row>
      <Row className='d-flex justify-items-between my-3'>
        <Col />
        <Col className='d-flex justify-content-center'>
          <Button onClick={startGame} variant='primary'>
            Play
          </Button>
        </Col>
        <Col />
      </Row>
    </Container>
  )
}

export default EntryPage
