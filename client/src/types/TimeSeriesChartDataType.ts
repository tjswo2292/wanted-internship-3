import { ChartDataset } from 'chart.js'

export type TimeSeriesChartDataType = {
  x: number
  y: {
    id: string
    value_area: number
    value_bar: number
  }
}

export type ChartDataPropsType = {
  labels?: string[]
  datasets: ChartDataset<'line' | 'bar', TimeSeriesChartDataType[]>[]
}
