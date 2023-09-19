/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chart } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LineController, BarController, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, BarElement } from 'chart.js'
import type { ChartData } from 'chart.js'
import styled from 'styled-components'

import { option } from '../util/chartOption'
import { TimeSeriesChartDataType } from '../types/TimeSeriesChartDataType'
import { forwardRef } from 'react'

ChartJS.register(CategoryScale, LineController, BarController, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler)

interface TimeSeriesChartProps {
  chartData: ChartData<'bar' | 'line', TimeSeriesChartDataType[]>
  onClick: React.MouseEventHandler<HTMLCanvasElement>
}

const ChartView = forwardRef<any, TimeSeriesChartProps>(({ chartData, onClick }, ref) => {
  return <Box>{chartData.labels?.length !== 0 && <Chart onClick={onClick} type="bar" data={chartData} options={option} ref={ref} />}</Box>
})

ChartView.displayName = 'ChartView'

const Box = styled.div``

export default ChartView
