import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
function GameScore(props) {
  const { lastWords, score } = props
  const insertedWords = lastWords.map((word) => {
    return (
      <div>
        <span>{word}</span>
      </div>
    )
  })

  return (
    <>
      <Container>
        <Row>
          <Col />
          <Col>
            <Row>
              <h1 className='text-center'>Game Score</h1>
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
