<h1>Wanted Front-End Internship Mission[3]</h1>

<h2>기술스택</h2>

<h3>main</h3>

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

<h3>style</h3>

![Styled-Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white)
![Styled-reset](https://img.shields.io/badge/styled--reset-DB7093?style=for-the-badge&logo=styledreset&logoColor=white)

<h3>chart library</h3>

![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartjs&logoColor=white)
![react-chartjs-2](https://img.shields.io/badge/react--chartjs--2-61DAFB?style=for-the-badge&logo=chartjs&logoColor=white)


<h2>버전 정보</h2>

| 이름               | 버전    |
| ----------------- | ------- |
| node              | ^18.7.0 |
| npm               | ^9.8.1 |
| react             | ^18.2.0 |
| vite              | ^4.4.5  |
| react-chartjs-2   | ^5.2.0  |
| chart.js          | ^4.4.0  |

<h2>프로젝트 실행 방법</h2>

```
cd server
npm install

cd client
npm install

server 폴더에서 npm start
```

<h2>주요기능</h2>

### hover 기능시 툴팁 형태로 정보제공

![chart_function_hover](https://github.com/tjswo2292/wanted-internship-3/assets/55657931/bce986d9-8f5a-4389-88ca-5be4f1a1bfa4)

```
tooltip: {
      callbacks: {
        title: (data: ChartTooltipDataType) => {
          const dataItemIndex = data[0].dataIndex
          const region = data[0].dataset.dataLocation[dataItemIndex]
          return region
        },
      },
    },
```
```
util/getChartData.ts

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
```
title의 parameter에 data는 차트 막대기 하나하나의 데이터를 가지고 있다. 그러므로 hover되는 차트 막대기의
index인 dataItemIndex를 구하고, Chart 컴포넌트의 data 옵션을 전달할 때, 미리 작업해 놓은 dataLocation 속성의 index로
추가하고 return 시키면 차트에 hover 할 때마다 id(지역이름)이 보여진다.
react-chartjs-2 라이브러리에서 Chart option에 위의 코드를 추가하면 알아서 해주기 때문에 어려운건 없었다.

----

### 지역 버튼 클릭시 해당하는 지역 데이터 하이라이트

![chart_function_filter_btn](https://github.com/tjswo2292/wanted-internship-3/assets/55657931/33bdd300-5631-4b5d-bf77-b68eb5293f82)

코드를 무턱대고 작성하다 보니 관심사 분리가 제대로 되지 않았고, 코드 또한 보기 어려웠기 때문에 useChartData custom hook을
선언하여 refactoring 했다.

지역 버튼을 클릭하면 react-chartjs-2에서 제공하는 Chart 컴포넌트에 전달되는 데이터에서 클릭된 지역 이름과 일치하면 'rgb(255,255,153)' 일치하지 않으면 'rgb(65, 65, 220)'
넣어 배열을 만든 후 Chart 컴포넌트에 전달되는 data에서 backgroundColor를 업데이트 하는 방식으로 구현했다.

-----

### 특정 데이터 구역 클릭 필터링

![chart_function_chart](https://github.com/tjswo2292/wanted-internship-3/assets/55657931/4dbf0de9-5cc1-47e3-9c9b-9bc2fbd43a39)

이 기능도 위의 기능과 비슷하게 구현했다.

차트를 클릭하면 클릭된 차트 id(지역)를 가져오고, id를 기반으로 Chart 컴포넌트의 backgroundColor에 전달될 color 배열을 만들어서
Chart 컴포넌트에 전달되는 data에서 backgroundColor를 업데이트 하는 방식으로 구현했다.

<h2>commit message convention</h2> 

| Commit Type | Format                                               |
| ----------- | ---------------------------------------------------- |
| feat        | 새로운 기능 추가                                     |
| bug         | 버그 수정                                            |
| design      | 사용자 UI 디자인 변경(CSS 등)                        |
| refactor    | 코드 리팩토링                                        |
| rename      | 파일 혹은 폴더명을 수정만 한 경우                    |
| remove      | 파일을 삭제만 한 경우                                |
| docs        | 문서수정                                             |
| chore       | 빌드 업무 수정, 패키지 매니저 수정(gitignore수정 등) |
