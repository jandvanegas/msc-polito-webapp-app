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
      difficulty: event.target.elements.difficulty.value,
      category: event.target.elements.category.value,
    })
  }
  return (
    <Form onSubmit={handleSubmitSettings}>
      <Row className='d-flex justify-items-between my-3'>
        <Col />
        <Col>
          <FloatingLabel controlId='difficulty' label='Difficulty'>
            <Form.Select required={true}>
              <option value='easy'>Easy</option>
              <option value='middle'>Middle</option>
              <option value='hard'>Hard</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col />
      </Row>
      <Row className='d-flex justify-items-between my-3'>
        <Col />
        <Col>
          <FloatingLabel controlId='category' label='Category'>
            <Form.Select required={true}>
              <option value='colors'>Colors</option>
              <option value='countries'>Countries</option>
              <option value='animals'>Animals</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col />
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
