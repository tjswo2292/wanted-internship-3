import Router from './router/Router'
import { GlobalStyle } from './style/GlobalStyle'
import ColorProvider from './context/colorProvider'

const App = () => {
  return (
    <ColorProvider>
      <Router />
      <GlobalStyle />
    </ColorProvider>
  )
}

export default App
