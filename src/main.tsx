import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/ReactToastify.min.css';
import '@tourmalinecore/react-table-responsive/es/index.css';
import '@tourmalinecore/react-tc-modal/es/index.css';

import './styles/index.scss';

import { ToastContainer } from 'react-toastify';
import { App } from './App';
import { ThemeProvider } from './theme/themeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById(`root`) as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <App />
      <ToastContainer
        newestOnTop
      />
    </ThemeProvider>
  </QueryClientProvider>
  // </React.StrictMode>
  ,
);
