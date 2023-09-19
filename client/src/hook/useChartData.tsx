import React, { useContext, useEffect, useRef, useState } from 'react'

import { Chart as ChartJS } from 'chart.js'

import { publicApi } from '../api/publicApi'
import { getCharData } from '../util/getChartData'
import { ChartDataPropsType } from '../types/TimeSeriesChartDataType'
import { ColorContext } from '../context/colorProvider'
import { updateDatasets } from '../util/updateDatasets'
import { removeDuplicatesArray } from '../util/removeDuplicatesArray'
import type { InteractionItem } from 'chart.js'
import { getElementsAtEvent } from 'react-chartjs-2'

const useChartData = () => {
  const [chartData, setChartData] = useState<ChartDataPropsType>({ datasets: [] })
  const [labels, setLabels] = useState<string[]>([])
  const [regionForBtn, setRegionForBtn] = useState<string[]>([])

  const chartRef = useRef<ChartJS>(null)

  const { colorArray, updateColorArray } = useContext(ColorContext)

  const handleRegionButton = (buttonTitle: string) => {
    updateColorArray(updateDatasets(buttonTitle, chartData))
  }

  const getClickedElement = (element: InteractionItem[]) => {
    if (!element.length || chartData.datasets.length === 0) return
    const { datasetIndex, index } = element[0]
    const id = chartData.datasets[datasetIndex].data[index].y.id
    return id
  }

  const highlightById = (filteredId: string | undefined) => {
    updateColorArray(updateDatasets(filteredId, chartData))
  }

  const handleChartClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!chartRef.current) return
    const clickedElementInCanvas = getElementsAtEvent(chartRef.current, event)
    const id = getClickedElement(clickedElementInCanvas)
    highlightById(id)
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
    chartRef,
    regionItem,
    chartDataProps: {
      labels,
      datasets: chartData.datasets,
    },
    handleRegionButton,
    handleChartClick,
  }
}

export default useChartData
