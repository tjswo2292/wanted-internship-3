import styled from 'styled-components'

import useChartData from '../../hook/useChartData'

const FilterButton = () => {
  const { regionItem, handleRegionButton } = useChartData()

  return (
    <Box>
      <Wrapper>
        {regionItem.map(element => (
          <ButtonItem key={element}>
            <Button onClick={() => handleRegionButton(element)}>{element}</Button>
          </ButtonItem>
        ))}
      </Wrapper>
    </Box>
  )
}

const Box = styled.div`
  display: flex;
  justify-content: center;
`
const Wrapper = styled.ul`
  display: flex;
`
const ButtonItem = styled.li`
  margin-right: 2rem;

  &:last-child {
    margin-right: 0;
  }
`
const Button = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 1rem;
  font-size: 18px;
  font-weight: bold;
  background-color: #038cfc;
`

export default FilterButton
