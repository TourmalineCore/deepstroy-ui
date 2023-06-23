import { mount } from 'cypress/react18';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

// https://docs.cypress.io/guides/component-testing/react/examples
// to wrap all components in router in case they use e.g. useLocation inside
export default function mountWithRouter(component, options = {}) {
  const {
    routerProps = {
      initialEntries: [`/`],
    },
    ...mountOptions
  } = options;

  const wrapped = (

    <MemoryRouter {...routerProps}>
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    </MemoryRouter>
  );

  return mount(wrapped, mountOptions);
}
