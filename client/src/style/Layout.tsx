import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Layout = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  )
}

const Box = styled.div`
  height: 100%;
  padding: 40px;
  background-color: #cae9ff;
`

export default Layout
