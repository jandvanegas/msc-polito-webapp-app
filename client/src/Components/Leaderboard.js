import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from 'react'
import Api from '../Api'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])

  useEffect(() => {
    const checkLeaderboard = async () => {
      const response = await Api.getLeaderboard()
      setLeaders(response)
    }
    checkLeaderboard()
  }, [])

  const records = leaders.map((record, index) => {
    return (
      <tr key={index}>
        <td>{record.category}</td>
        <td>{record.name}</td>
        <td>{record.score}</td>
      </tr>
    )
  })
  return (
    <Container>
      <Row className='d-flex justify-items-between my-3'>
        <Col />
        <Col>
          <Table hover variant='principal'>
            <thead>
              <tr>
                <th>Category</th>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>{records}</tbody>
          </Table>
        </Col>
        <Col />
      </Row>
    </Container>
  )
}
export default Leaderboard
