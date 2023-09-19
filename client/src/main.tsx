import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyle } from './style/GlobalStyle.tsx'
import ColorProvider from './context/colorProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ColorProvider>
    <GlobalStyle />
    <App />
  </ColorProvider>
)
