/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from 'react'

import { Chart, getElementsAtEvent } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LineController, BarController, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, BarElement, LogarithmicScale } from 'chart.js'
import type { ChartData, InteractionItem } from 'chart.js'
import styled from 'styled-components'

import FilterButton from './FilterButton'
import { option } from '../../util/chartOption'
import { publicApi } from '../../api/publicApi'
import { VALUE_AREA, VALUE_BAR, Y_AXIS_KEY } from '../../consts/chart.const'
import { updateDatasets } from '../../util/updateDatasets'
import { ColorContext } from '../../context/colorProvider'

ChartJS.register(CategoryScale, LineController, BarController, LinearScale, PointElement, LineElement, BarElement, LogarithmicScale, Title, Tooltip, Legend, Filler)

const ChartView = () => {
  const [chartDataOption, setChartDataOption] = useState<object[]>([])
  const [labels, setLabels] = useState<string[]>([])
  const [dataRegion, setDataRegion] = useState<string[]>([])
  const [chartProps, setChartProps] = useState<any>()

  const chartRef = useRef<ChartJS>(null)

  const { colorArray, updateColorArray } = useContext(ColorContext)

  const getClickedElement = (element: InteractionItem[]) => {
    if (!element.length || chartProps.datasets.length === 0) return
    const { datasetIndex, index } = element[0]
    const id = chartProps.datasets[datasetIndex].data[index].y.id
    return id
  }

  const highlightById = (filteredId: string) => {
    updateColorArray(updateDatasets(filteredId, chartProps))
  }

  const onCanvasClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!chartRef.current) return
    const clickedElementInCanvas = getElementsAtEvent(chartRef.current, event)
    const id = getClickedElement(clickedElementInCanvas)
    highlightById(id)
  }

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await publicApi.GET()
        const { data } = response

        setDataRegion(data.map((element: { id: number }) => element.id))
        setLabels(data.map((element: { timestamp: string }) => element.timestamp))
        setChartDataOption(
          data.map((element: { id: string; value_area: number; value_bar: number }) => ({
            x: element.value_area,
            y: {
              id: element.id,
              value_area: element.value_area,
              value_bar: element.value_bar,
            },
          }))
        )
      } catch (error) {
        console.log('에러', error)
      }
    }

    fetchChartData()
  }, [])

  useEffect(() => {
    setChartProps({
      labels,
      datasets: [
        {
          type: 'line' as const,
          yAxisID: 'yLeft',
          label: 'Area',
          borderColor: 'rgb(220, 65, 137)',
          borderWidth: 2,
          data: chartDataOption,
          parsing: {
            yAxisKey: `${Y_AXIS_KEY}.${VALUE_AREA}`,
          },
          dataLocation: dataRegion,
        },
        {
          type: 'bar' as const,
          yAxisID: 'yRight',
          label: 'Bar',
          data: chartDataOption,
          parsing: {
            yAxisKey: `${Y_AXIS_KEY}.${VALUE_BAR}`,
          },
          backgroundColor: colorArray.length === 0 ? 'rgb(65, 65, 220)' : colorArray,
        },
      ],
    })
  }, [chartDataOption, colorArray, labels])

  return (
    <Box>
      <FilterButton chartProps={chartProps} regionArray={dataRegion} chartRef={chartRef} />
      {chartProps && <Chart type="bar" ref={chartRef} options={option} data={chartProps} onClick={onCanvasClick} />}
    </Box>
  )
}
const Box = styled.div``
export default ChartView
