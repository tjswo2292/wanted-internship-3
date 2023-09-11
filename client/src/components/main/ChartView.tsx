/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { publicApi } from '../../api/publicApi'
import { Chart } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController } from 'chart.js'

ChartJS.register(LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController)

const ChartView = () => {
  const [AreaData, setAreaData] = useState<number[]>([])
  const [barData, setBarData] = useState<number[]>([])
  const [labels, setLabels] = useState<string[]>([])
  const [dataRegion, setDataRegion] = useState<string[]>([])
  const [chartProps, setChartProps] = useState<any>()

  const option = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: true,
    },
    stacked: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Flexsys',
      },
      tooltip: {
        callbacks: {
          title: (data: any) => {
            const dataItemIndex = data[0].dataIndex
            const region = data[0].dataset.dataLocation[dataItemIndex]
            return region
          },
        },
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await publicApi.GET()
        const { data } = response

        setDataRegion(data.map((element: { id: number }) => element.id))
        setAreaData(data.map((element: { value_area: number }) => element.value_area))
        setBarData(data.map((element: { value_bar: number }) => element.value_bar))
        setLabels(data.map((element: { timestamp: string }) => element.timestamp))
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
          label: 'Area',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
          fill: false,
          data: AreaData,
          dataLocation: dataRegion,
          yAxisID: 'y',
        },
        {
          type: 'bar' as const,
          label: 'Bar',
          borderColor: 'white',
          borderWidth: 2,
          data: barData,
          backgroundColor: 'rgb(75, 192, 192)',
          yAxisID: 'y1',
        },
      ],
    })
  }, [AreaData, barData, labels])

  return <>{chartProps && <Chart type="bar" options={option} data={chartProps} />}</>
}

export default ChartView
