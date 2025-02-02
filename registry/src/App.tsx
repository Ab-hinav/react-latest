import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Root from './pages/Root'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage'
import SearchPage from './pages/SearchPage'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Root />} path='/' >
            <Route index element={<HomePage />} />
            <Route path='search' element={<SearchPage />} />
          </Route>

          <Route path='packages' element={<Root />}>
            <Route index element={<HomePage />} />
            <Route path=':name' element={<DetailsPage />} />
          </Route>

          <Route path='*' element={<Root></Root>} >
            <Route index element={<HomePage />} />
          </Route>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
