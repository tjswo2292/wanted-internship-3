/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChartDataPropsType } from '../types/TimeSeriesChartDataType'

export const updateDatasets = (filteredId: string | undefined, chartData: ChartDataPropsType): string[] => {
  const { data } = chartData.datasets[0]

  const colorArray: string[] = []

  data.map(({ y }: any) => (y.id === filteredId ? colorArray.push('rgb(255,255,153)') : colorArray.push('rgb(65, 65, 220)')))

  return colorArray
}
