import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Api from '../../Api'

function GameScore(props) {
  const { lastWords, settings, letter } = props
  const [score, setScore] = useState(0)
  const insertedWords = lastWords.map((word, index) => {
    return (
      <div key={index}>
        <span>{word}</span>
      </div>
    )
  })

  useEffect(() => {
    const checkScore = async () => {
      const response = await Api.postScore(
        settings.category,
        letter,
        settings.level,
        lastWords
      )
      console.log(response)
      setScore(response.score)
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
              <h2>Level</h2>
              <div className='text-right'>{settings.level}</div>
              <h2>Category</h2>
              <div className='text-right'>{settings.category}</div>
              <h2>Inserted words</h2>
              <div className='text-right'>{insertedWords}</div>
              <h2>Score</h2>
              <div className='text-center'>{score}</div>
            </Row>
          </Col>
          <Col />
        </Row>

        <Row className='d-flex justify-items-between my-3'>
          <Col />
          <Col className='d-flex justify-content-center'>
            <Button variant='primary' className='mx-1'>
              Play Again
            </Button>
            <Button variant='secondary' className='mx-1'>
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
