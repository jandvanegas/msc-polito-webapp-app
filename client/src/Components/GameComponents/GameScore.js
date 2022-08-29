import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Api from '../../Api'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function GameScore(props) {
  const { lastWords, settings, letter, setLetter, setSettings } = props
  const [score, setScore] = useState(0)
  const [passed, setPassed] = useState(false)

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

  useEffect(() => {
    const checkScore = async () => {
      const uniqueWords = [...new Set(lastWords)]
      const response = await Api.postScore(
        settings.category,
        letter,
        settings.level,
        uniqueWords
      )
      // await Api.logIn({
      //   username: 'john.doe@polito.it',
      //   password: 'password',
      // })
      await Api.addRound({
        category: settings.category,
        letter: letter,
        level: settings.level,
        words: uniqueWords,
        score: response.score,
      })

      setScore(response.score)
      setPassed(response.passed)
    }
    checkScore()
  }, [settings, lastWords, letter])

  return (
    <>
      <Container>
        <Row>
          <Col />
          <Col>
            <Row>
              <h1 className='text-center'>Game Score</h1>
              {passed && (
                <h2 className='text-center text-success my-3'>PASSED!</h2>
              )}
              {!passed && <h2 className='text-center text-danger'>FAILED!</h2>}
              <h2>Level</h2>
              <div className='text-right border'>{settings.level}</div>
              <h2>Category</h2>
              <div className='text-right border'>{settings.category}</div>
              <h2>Inserted words</h2>
              <div className='text-right border'>{insertedWords(lastWords)}</div>
              {passed && (
                <span>
                  <h2 className='text-center text-success my-3'>
                    Score: {score} points
                  </h2>
                </span>
              )}
            </Row>
          </Col>
          <Col />
        </Row>

        <Row className='d-flex justify-items-between my-3'>
          <Col />
          <Col className='d-flex justify-content-center'>
            <Button variant='primary' className='mx-1' onClick={resetGame}>
              Play Again
            </Button>
            <Button variant='secondary' className='mx-1' onClick={goHome}>
              Close
            </Button>
          </Col>
          <Col />
        </Row>
      </Container>
    </>
  )
}
export default GameScore
