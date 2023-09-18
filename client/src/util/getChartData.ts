import { VALUE_AREA, VALUE_BAR, Y_AXIS_KEY } from '../consts/chart.const'
import { ChartResponseType } from '../types/ChartResponseType'
import { TimeSeriesChartDataType } from '../types/TimeSeriesChartDataType'

const getAreaChartData = (dataList: TimeSeriesChartDataType[]) => {
  return {
    type: 'line' as const,
    yAxisID: 'yLeft',
    label: 'Area',
    borderColor: 'rgb(220, 65, 137)',
    borderWidth: 2,
    data: dataList,
    parsing: {
      yAxisKey: `${Y_AXIS_KEY}.${VALUE_AREA}`,
    },
    // option -> tooltip의 title
    dataLocation: dataList.map(element => element.y.id),
  }
}

const getBarChartData = (dataList: TimeSeriesChartDataType[]) => {
  return {
    type: 'bar' as const,
    yAxisID: 'yRight',
    label: 'Bar',
    data: dataList,
    parsing: {
      yAxisKey: `${Y_AXIS_KEY}.${VALUE_BAR}`,
    },
    backgroundColor: 'rgb(65, 65, 220)',
  }
}

export const getCharData = (responseData: ChartResponseType[]) => {
  const dataList = responseData.map(({ id, value_area, value_bar }) => ({
    x: value_area,
    y: {
      id,
      value_area,
      value_bar,
    },
  }))

  return {
    datasets: [getAreaChartData(dataList), getBarChartData(dataList)],
  }
}
