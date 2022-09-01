import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

function SelectionPage(props) {
  const { setSettings } = props

  const handleSubmitSettings = (event) => {
    event.preventDefault()
    setSettings({
      level: event.target.elements.level.value,
      category: event.target.elements.category.value,
    })
  }
  return (
    <Form onSubmit={handleSubmitSettings}>
      <Row className='d-flex justify-items-between my-3'>
        <Col xs={1} sm={2} md={4} />
        <Col>
          <FloatingLabel controlId='level' label='Level'>
            <Form.Select required={true}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col xs={1} sm={2} md={4} />
      </Row>
      <Row className='d-flex justify-items-between my-3'>
        <Col xs={1} sm={2} md={4} />
        <Col>
          <FloatingLabel controlId='category' label='Category'>
            <Form.Select required={true}>
              <option value='colors'>Colors</option>
              <option value='countries'>Countries</option>
              <option value='animals'>Animals</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col xs={1} sm={2} md={4} />
      </Row>
      <Row className='d-flex justify-items-between my-3'>
        <Col />
        <Col className='d-flex justify-content-center'>
          <Button variant='primary' type='submit'>
            Start
          </Button>
        </Col>
        <Col />
      </Row>
    </Form>
  )
}

export default SelectionPage
