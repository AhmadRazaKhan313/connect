import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import jwt from 'jwtservice/jwtService';
import { Navigate } from 'react-router';
import ApiConnectionError from 'views/error/ApiConnectionError';

// login option 3 routing
const LandingPage = Loadable(lazy(() => import('views/landing-page')));
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication/Login')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const checkLogin = (element) => {
    return jwt.getIsLogin() !== true ? element : <Navigate to="/dashboard" replace={true} />;
};

const AuthenticationRoutes = {
    path: '/',
    element: checkLogin(<MinimalLayout />),
    children: [
        {
            path: '/',
            element: checkLogin(<LandingPage />)
        },
        {
            path: '/login',
            element: checkLogin(<AuthLogin />)
        },
        {
            path: '/api-error',
            element: checkLogin(<ApiConnectionError />)
        }
    ]
};

export default AuthenticationRoutes;
