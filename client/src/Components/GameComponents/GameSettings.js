import Col from 'react-bootstrap/Col'
import configData from '../../config'
import Timer from './Timer'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
function GameSettings(props) {
  const { settings, randomLetter, stopGame} = props

  return (
    <Col className='d-flex-col justify-content-center my-3' align='center'>
      <Row>
        <Card bg='secondary' className='mb-2'>
          <Card.Header>Category</Card.Header>
          <Card.Body>
            <Card.Title>{settings.category.toUpperCase()}</Card.Title>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Card bg='primary' className='mb-2'>
          <Card.Header>Letter</Card.Header>
          <Card.Body>
            <Card.Title>{randomLetter}</Card.Title>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Card bg='secondary' className='mb-2'>
          <Card.Header>Time</Card.Header>
          <Card.Body>
            <Card.Title>
              <Timer
                timerCallback={stopGame}
                time={configData.GAME_DURATION_IN_SECONDS}
              />
            </Card.Title>
            <Card.Text>Seconds Left</Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Col>
  )
}

export default GameSettings
