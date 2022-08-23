import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

function EntryPage() {
  return (
    <Container>
      <Row class='align-items-center'>
        <Col>
          <div class='my-3'>
            <img src='./images/icon-menu-14.jpg' alt='Categories' />
          </div>
        </Col>
      </Row>
      <Row class='align-items-center'>
        <Col>
          <div class='my-3'>
            <Button variant='primary'>Play</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default EntryPage
