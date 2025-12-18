import App from './App.jsx';
import { ErrorPage } from './pages/ErrorPage.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';

export const routes = [
    {
        path: '/',
        element: <ProtectedRoute><App /></ProtectedRoute>,
        errorElement: <ErrorPage />
    }
];