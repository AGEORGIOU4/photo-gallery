import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import '@fontsource/montserrat' // Defaults to weight 400
import '@fontsource/montserrat/400.css' // Specify weight
import '@fontsource/montserrat/900.css' // Specify weight
import '@fontsource/montserrat/400-italic.css' // Specify weight and style
import '@fontsource/dm-sans' // Defaults to weight 400
import '@fontsource/dm-sans/400.css' // Specify weight
import '@fontsource/dm-sans/400-italic.css' // Specify weight and style
import { CLoading } from './common/CLoading'

// const loading = (
//   <div className="pt-3 text-center">
//     <div className="sk-spinner sk-spinner-pulse"></div>
//   </div>
// )

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={<CLoading />}>

          <Routes>
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
