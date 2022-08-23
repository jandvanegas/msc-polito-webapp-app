import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import '../App.css'

function SelectionPage() {
  return (
    <Container>
      <Form.Label>Difficulty</Form.Label>
      <Row class='d-flex justify-items-between'>
        <InputGroup>
          <Col />
          <Col className='my-3'>
            <Row>
              <Col>
                <Button
                  className='Full-width-button'
                  variant='outline-secondary'
                >
                  Easy
                </Button>
              </Col>
              <Col>
                <Button
                  className='Full-width-button'
                  variant='outline-secondary'
                >
                  Middle
                </Button>
              </Col>
              <Col>
                <Button
                  className='Full-width-button'
                  variant='outline-secondary'
                >
                  Hard
                </Button>
              </Col>
            </Row>
          </Col>
          <Col />
        </InputGroup>
      </Row>
      <Form.Label>Category</Form.Label>
      <Row class='d-flex justify-items-between'>
        <InputGroup>
          <Col />
          <Col className='my-3'>
            <Row>
              <Col>
                <Button
                  className='Full-width-button'
                  variant='outline-secondary'
                >
                  Colors
                </Button>
              </Col>
              <Col>
                <Button
                  className='Full-width-button'
                  variant='outline-secondary'
                >
                  Animals
                </Button>
              </Col>
              <Col>
                <Button
                  className='Full-width-button'
                  variant='outline-secondary'
                >
                  Countries
                </Button>
              </Col>
            </Row>
          </Col>
          <Col />
        </InputGroup>
      </Row>
    </Container>
  )
}

export default SelectionPage
