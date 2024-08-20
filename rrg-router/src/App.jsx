import { lazy, Suspense } from "react"

import HomePage from "./pages/Home"
import { Page404 } from "./pages/404"
import SearchPage from './pages/Search'

import { Router } from "./components/Router"
import { Route } from "./components/Route"

const LazyAboutPage = lazy(() => import('./pages/About'))

const routes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App() {
  return (
    <main>
      <Suspense fallback={null} >
        <Router routes={routes} defaultComponent={Page404}>
          <Route path='/' Component={HomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
