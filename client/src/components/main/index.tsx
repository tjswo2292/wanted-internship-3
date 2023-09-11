import styled from 'styled-components'
import ChartView from './ChartView'

const Main = () => {
  return (
    <Box>
      <ChartView />
    </Box>
  )
}

const Box = styled.div`
  width: inherit;
  height: inherit;
`

export default Main
