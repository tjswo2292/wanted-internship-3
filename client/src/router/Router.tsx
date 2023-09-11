import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from '../components/main'
import Layout from '../style/Layout'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
