import GameInstructions from './GameInstructions'
import GameSettings from './GameSettings'
import GameWords from './GameWords'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

function GamePage(props) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)]
  const { stopGame, settings } = props

  return (
    <Container fluid>
      <Row>
        <GameSettings
          settings={settings}
          randomLetter={randomLetter}
          stopGame={stopGame}
        />
        <Col>
          <Row>
            <GameWords settings={settings} randomLetter={randomLetter} />
          </Row>
        </Col>
        <Col>
          <GameInstructions settings={settings} randomLetter={randomLetter} />
        </Col>
      </Row>
    </Container>
  )
}
export default GamePage
