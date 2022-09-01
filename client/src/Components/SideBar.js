import React from 'react'
import { Collapse } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SideBar(props) {
  const navigate = useNavigate()
  return (
    <Collapse in={props.open} className='d-md-none'>
      <aside id='side-bar'>
        <ListGroup variant='flush' className='my-2'>
          <ListGroup.Item
            action
            onClick={() => {
              props.setSelected(1)
              navigate('/', { state: 1 })
            }}
            active={props.selected === 1}
          >
            Home
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              props.setSelected(2)
              navigate('/leaderboard', { state: 2 })
            }}
            active={props.selected === 2}
          >
            Hall of Fame
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() => {
              props.setSelected(3)
              navigate('/history', { state: 3 })
            }}
            active={props.selected === 3}
          >
            My History
          </ListGroup.Item>
        </ListGroup>
      </aside>
    </Collapse>
  )
}

export default SideBar
