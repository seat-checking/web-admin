import { RouterProvider } from 'react-router-dom';
import { router } from 'pages/Router';

const App: React.FC = () => {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
};

export default App;
