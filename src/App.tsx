import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { CustomToastContainer } from 'components/CustomToastContainer';
import { router } from 'pages/Router';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
      <CustomToastContainer />
    </QueryClientProvider>
  );
};

export default App;
