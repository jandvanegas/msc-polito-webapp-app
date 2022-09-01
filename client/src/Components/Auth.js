import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router-dom'

function LoginForm(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const credentials = { username, password }
    props.login(credentials)
  }

  return (
    <Form className='' onSubmit={handleSubmit}>
      <Form.Group controlId='username'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          required={true}
        />
      </Form.Group>

      <Form.Group controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          required={true}
          minLength={6}
        />
      </Form.Group>

      <Row className='d-flex-row justify-items-center'>
        <Col />
        <Col className='my-3'>
          <Button type='submit'>Login</Button>
        </Col>
        <Col />
      </Row>
    </Form>
  )
}

function LoginPage(props) {
  const navigate = useNavigate()
  useEffect(() => {
    const redirect = async () => {
      if (props.loggedIn) {
        navigate('/')
      }
    }
    redirect()
  }, [props.loggedIn, navigate])
  return (
    <Container fluid>
      <Row className='d-flex justify-items-between'>
        <Col xs={1} sm={2} md={4} />
        <Col>
          <Row className='text-center'>
            <h1>Login</h1>
          </Row>
          <Row className='my-3'>
            <LoginForm login={props.login} />
          </Row>
        </Col>
        <Col xs={1} sm={2} md={4} />
      </Row>
    </Container>
  )
}

export default LoginPage
