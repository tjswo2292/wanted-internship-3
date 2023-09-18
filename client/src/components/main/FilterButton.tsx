import styled from 'styled-components'
import { ChartData, Chart as ChartJS, ChartTypeRegistry } from 'chart.js'
import { removeDuplicatesArray } from '../../util/removeDuplicatesArray'
import { useContext } from 'react'
import { ColorContext } from '../../context/colorProvider'
import { updateDatasets } from '../../util/updateDatasets'

interface FilterButtonProps {
  regionArray: string[]
  chartRef: React.RefObject<ChartJS<keyof ChartTypeRegistry>>
  chartProps: ChartData<'line' | 'bar'>
}

const FilterButton = ({ regionArray, chartProps }: FilterButtonProps) => {
  const { updateColorArray } = useContext(ColorContext)

  const regionItem = removeDuplicatesArray(regionArray)

  const handleSortingButtonClick = (buttonTitle: string) => {
    updateColorArray(updateDatasets(buttonTitle, chartProps))
  }

  return (
    <Box>
      <Wrapper>
        {regionItem.map(element => (
          <ButtonItem key={element}>
            <Button onClick={() => handleSortingButtonClick(element)}>{element}</Button>
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
