/* eslint-disable @typescript-eslint/no-explicit-any */
const option = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '원티드 과제',
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
    yLeft: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      title: { display: true, text: 'Area' },
    },
    yRight: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      title: { display: true, text: 'Bar' },
    },
  },
}

export { option }
