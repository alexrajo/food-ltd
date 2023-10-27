import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'src/redux/store';
import App from 'src/App';
import 'src/index.css';
import Home from 'src/pages/Home';
import DishPage from './pages/Dish';
import Favorites from 'src/pages/Favorites';

const router = createBrowserRouter([
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
        path: '*',
        element: <>404</>,
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
        element: <>Settings</>,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<>Loading...</>} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
