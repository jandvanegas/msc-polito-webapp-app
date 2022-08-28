import { useState } from 'react'
import GameInstructions from './GameInstructions'
import GameSettings from './GameSettings'
import GameWords from './GameWords'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import configData from '../../config'

function GamePage(props) {
  const alphabet = configData.ALPHABET
  const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)]
  const { settings, setLetter, setLastWords } = props
  const [words, setWords] = useState([])
  const [gameLetter, ] = useState(randomLetter)

  const stopGame = () => {
    setLetter(gameLetter)
    setLastWords(words)
  }

  return (
    <Container fluid>
      <Row>
        <GameSettings
          settings={settings}
          randomLetter={gameLetter}
          stopGame={stopGame}
        />
        <Col>
          <Row>
            <GameWords
              settings={settings}
              randomLetter={gameLetter}
              words={words}
              setWords={setWords}
              stopGame={stopGame}
            />
          </Row>
        </Col>
        <Col>
          <GameInstructions settings={settings} randomLetter={gameLetter} />
        </Col>
      </Row>
    </Container>
  )
}
export default GamePage
