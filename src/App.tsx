import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { CustomToastContainer } from 'components/CustomToastContainer';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { router } from 'pages/Router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 2,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />
      <CustomToastContainer />
    </QueryClientProvider>
  );
};

export default App;
