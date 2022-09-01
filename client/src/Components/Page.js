import Container from 'react-bootstrap/Container'
import NavigationBar from './NavigationBar'
import Row from 'react-bootstrap/Row'
import SideBar from './SideBar'
import { useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'

function Page(props) {
  const { loggedIn, handleLogout } = props
  const location = useLocation()
  const [selected, setSelected] = useState(location.state ? location.state : 1)
  const [sideBarOpen, setSideBarOpen] = useState(false)
  return (
    <Container>
      <Row>
        <NavigationBar
          open={sideBarOpen}
          setOpen={setSideBarOpen}
          loggedIn={loggedIn}
          handleLogout={handleLogout}
        />
        <SideBar
          selected={selected}
          open={sideBarOpen}
          setSelected={setSelected}
          loggedIn={loggedIn}
        />
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  )
}
export default Page
