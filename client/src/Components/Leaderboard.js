import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
function Leaderboard() {
  return (
    <Container>
      <Row className='d-flex justify-items-between my-3'>
        <Col />
        <Col>
          <Table hover variant='principal'>
            <thead>
              <tr>
                <th></th>
                <th>Category</th>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>Country</td>
                <td>Player 1</td>
                <td>520</td>
              </tr>
              <tr>
                <td></td>
                <td>Colors</td>
                <td>Player 2</td>
                <td>400</td>
              </tr>
              <tr>
                <td></td>
                <td>Country</td>
                <td>Player 3</td>
                <td>320</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col />
      </Row>
    </Container>
  )
}
export default Leaderboard
