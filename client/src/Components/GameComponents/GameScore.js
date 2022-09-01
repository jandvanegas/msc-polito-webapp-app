import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function GameScore(props) {
  const { lastWords, settings, setLetter, setSettings, score } = props

  const navigate = useNavigate()
  const goHome = () => {
    navigate('/')
  }

  const resetGame = () => {
    setSettings({ level: 0, category: 0 })
    setLetter('')
  }

  const insertedWords = (words) => {
    const uniqueWords = [...new Set(words)]
    return uniqueWords.map((word, index) => {
      return (
        <div key={index}>
          <span>{word}</span>
        </div>
      )
    })
  }

  return (
    <>
      <Container>
        <Row>
          <Col xs={1} sm={2} md={4} />
          <Col>
            <Row>
              <h1 className='text-center'>Game Score</h1>
              {score && score.passed && (
                <h2 className='text-center text-success my-3'>PASSED!</h2>
              )}
              {(!score || !score.passed) && (
                <h2 className='text-center text-danger'>FAILED!</h2>
              )}
              <h2>Level</h2>
              <div className='text-right border'>{settings.level}</div>
              <h2>Category</h2>
              <div className='text-right border'>{settings.category}</div>
              <h2>Inserted words</h2>
              <div className='text-right border'>
                {insertedWords(lastWords)}
              </div>
              {score && score.passed && (
                <span>
                  <h2 className='text-center text-success my-3'>
                    Score: {score.score} points
                  </h2>
                </span>
              )}
            </Row>
          </Col>
          <Col xs={1} sm={2} md={4} />
        </Row>

        <Row className='d-flex justify-items-between my-3'>
          <Col xs={1} sm={2} md={4} />
          <Col className='d-flex justify-content-center'>
            <Button variant='primary' className='mx-1' onClick={resetGame}>
              Play Again
            </Button>
            <Button variant='secondary' className='mx-1' onClick={goHome}>
              Close
            </Button>
          </Col>
          <Col xs={1} sm={2} md={4} />
        </Row>
      </Container>
    </>
  )
}
export default GameScore
