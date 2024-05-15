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

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// Email App
const EmailApp = React.lazy(() => import('./views/apps/email/EmailApp'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={<CLoading />}>

          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="/apps/email/*" name="Email App" element={<EmailApp />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
