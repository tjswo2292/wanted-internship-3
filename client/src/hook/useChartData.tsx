import { useContext, useEffect, useState } from 'react'

import { publicApi } from '../api/publicApi'
import { getCharData } from '../util/getChartData'
import { ChartDataPropsType } from '../types/TimeSeriesChartDataType'
import { ColorContext } from '../context/colorProvider'
import { updateDatasets } from '../util/updateDatasets'
import { removeDuplicatesArray } from '../util/removeDuplicatesArray'

const useChartData = () => {
  const [chartData, setChartData] = useState<ChartDataPropsType>({ datasets: [] })
  const [labels, setLabels] = useState<string[]>([])
  const [regionForBtn, setRegionForBtn] = useState<string[]>([])

  const { colorArray, updateColorArray } = useContext(ColorContext)

  const handleRegionButton = (buttonTitle: string) => {
    updateColorArray(updateDatasets(buttonTitle, chartData))
  }

  const regionItem = removeDuplicatesArray(regionForBtn)

  useEffect(() => {
    setChartData(prev => ({
      ...prev,
      datasets: [
        {
          ...prev.datasets[0],
        },
        {
          ...prev.datasets[1],
          backgroundColor: colorArray,
        },
      ],
    }))
  }, [colorArray])

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await publicApi.GET()
        const { data } = response

        setRegionForBtn(data.map((element: { id: number }) => element.id))
        setChartData(getCharData(data))
        setLabels(data.map((element: { timestamp: string }) => element.timestamp))
      } catch (error) {
        console.log('에러', error)
      }
    }

    fetchChartData()
  }, [])

  return {
    regionItem,
    chartDataProps: {
      labels,
      datasets: chartData.datasets,
    },
    handleRegionButton,
  }
}

export default useChartData
