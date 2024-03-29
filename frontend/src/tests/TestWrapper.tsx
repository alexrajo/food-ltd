import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from 'src/App'
import DishPage from 'src/pages/Dish'
import ErrorPage from 'src/pages/Error'
import Home from 'src/pages/Home'
import Settings from 'src/pages/Settings'
import WriteReview from 'src/pages/WriteReview'
import { store } from 'src/redux/store'

const queryClient = new QueryClient()

export default function TestWrapper({ children }: { children: ReactNode }) {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <App />,
        children: [
          {
            path: '/',
            element: (
              <>
                {children}
                <Home />
              </>
            ),
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
            path: '/settings',
            element: <Settings />,
          },
        ],
      },
    ],
    {
      basename: '/',
    },
  )

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  )
}
