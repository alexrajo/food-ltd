/* eslint-disable import/extensions */
import React from 'react';

// React Router
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

// Tanstack
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import App from './App.tsx';

// Redux
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store.ts';
import { Provider } from 'react-redux';

// Styles
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
