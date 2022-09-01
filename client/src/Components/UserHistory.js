import { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Api from '../Api'
import { useNavigate } from 'react-router-dom'

function UserHistory(props) {
  const { loggedIn } = props
  const navigate = useNavigate()
  const [userRounds, setUserRounds] = useState([])

  useEffect(() => {
    const checkHistory = async () => {
      try {
        const userRounds = await Api.getRounds()
        setUserRounds(userRounds)
      } catch (err) {
        navigate('/')
      }
    }
    checkHistory()
  }, [navigate, loggedIn, setUserRounds])

  const records = userRounds.map((record, index) => {
    return (
      <tr key={index}>
        <td>{record.category}</td>
        <td>{record.letter}</td>
        <td>{record.level}</td>
        <td className='d-none d-lg-block'>{record.words.toString()}</td>
        <td>{record.score}</td>
        <td className='d-none d-lg-block'>{record.playedAt}</td>
      </tr>
    )
  })
  return (
    <Container>
      <Row className='d-flex justify-items-between my-3'>
        <Col>
          <Table hover variant='principal'>
            <thead>
              <tr key={'key'}>
                <th>Category</th>
                <th>Letter</th>
                <th>Level</th>
                <th className='d-none d-lg-block'>Words</th>
                <th>Score</th>
                <th className='d-none d-lg-block'>Played At</th>
              </tr>
            </thead>
            <tbody>{records}</tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
export default UserHistory
