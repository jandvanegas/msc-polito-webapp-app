import Container from 'react-bootstrap/Container'
import NavigationBar from './NavigationBar'
import Row from 'react-bootstrap/Row'

function Page(props) {
  const { loggedIn, handleLogout } = props
  return (
    <Container>
      <Row>
        <NavigationBar loggedIn={loggedIn} handleLogout={handleLogout} />
      </Row>
    </Container>
  )
}
export default Page
