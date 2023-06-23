import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'react-swipeable-list/dist/styles.css';
import './styles/index.scss';

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
    </ThemeProvider>
  </QueryClientProvider>
  // </React.StrictMode>
  ,
);
