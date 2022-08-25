import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

function SelectionPage() {
  return (
    <Container>
      <Row className='d-flex justify-items-between my-3'>
        <Col />
        <Col>
          <FloatingLabel controlId='floatingSelect' label='Difficulty'>
            <Form.Select>
              <option>Select Difficulty</option>
              <option value='1'>Easy</option>
              <option value='2'>Middle</option>
              <option value='3'>Hard</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col />
      </Row>
      <Row className='d-flex justify-items-between my-3 m'>
        <Col />
        <Col>
          <FloatingLabel controlId='floatingSelect' label='Category'>
            <Form.Select>
              <option>Select Category</option>
              <option value='1'>Colors</option>
              <option value='2'>Countries</option>
              <option value='3'>Animals</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col />
      </Row>
      <Row className='d-flex justify-items-between my-3'>
        <Col />
        <Col>
          <Button variant='primary'>Start</Button>
        </Col>
        <Col />
      </Row>
    </Container>
  )
}

export default SelectionPage
