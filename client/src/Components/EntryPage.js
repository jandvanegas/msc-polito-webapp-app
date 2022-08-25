import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'

function EntryPage() {
  return (
    <Container>
      <Row className='d-flex justify-items-between my-3'>
        <Col/>
        <Col>
            <img src='./images/icon-menu-14.jpg' alt='Categories' />
        </Col>
        <Col/>
      </Row>
      <Row className='d-flex justify-items-between my-3'>
        <Col/>
        <Col>
            <Button variant='primary'>Play</Button>
        </Col>
        <Col/>
      </Row>
    </Container>
  )
}

export default EntryPage
