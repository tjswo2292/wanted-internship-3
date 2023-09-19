import ChartView from './components/ChartView'
import FilterButton from './components/FilterButton'
import useChartData from './hook/useChartData'

const App = () => {
  const { chartRef, chartDataProps, handleChartClick } = useChartData()

  return (
    <>
      <FilterButton />
      <ChartView ref={chartRef} onClick={handleChartClick} chartData={chartDataProps} />
    </>
  )
}

export default App
