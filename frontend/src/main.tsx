import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'src/redux/store'
import App from 'src/App'
import 'src/index.css'
import Home from 'src/pages/Home'
import Favorites from 'src/pages/Favorites'
import Settings from 'src/pages/Settings'
import WriteReview from 'src/pages/WriteReview'
import DishPage from './pages/Dish'
import ErrorPage from './pages/Error'
import DocumentationPage from './pages/DocumentationPage'
import Documentation  from './components/documentation/DocumentationOutlet'
import DocumentationComponent from './components/documentation/DocumentationComponent'


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/dish/:id',
          element: <DishPage />,
        },
        {
          path: '/dish/:id/write-review',
          element: <WriteReview />,
        },
        {
          path: '*',
          element: <ErrorPage />,
        },
        {
          path: '/favorites',
          element: <Favorites />,
        },
        {
          path: '/search',
          element: <>Settings</>,
        },
        {
          path: '/settings',
          element: <Settings />,
        },
      ],
    },
    {
      path: '/docs', 
      element: <DocumentationPage />,
      children: [
        {
          path: '/docs', 
          element: <DocumentationComponent />
        },
        {
          path: '/docs/:section/:subsection',
          element: <Documentation />
        }

      ]
    }
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<>Loading...</>} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
