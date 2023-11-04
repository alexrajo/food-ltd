import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from 'src/App'
import DishPage from 'src/pages/Dish'
import ErrorPage from 'src/pages/Error'
import Favorites from 'src/pages/Favorites'
import Home from 'src/pages/Home'
import Settings from 'src/pages/Settings'
import WriteReview from 'src/pages/WriteReview'
import { store } from 'src/redux/store'

const queryClient = new QueryClient()


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
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)

export default function TestWrapper() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  )
}
