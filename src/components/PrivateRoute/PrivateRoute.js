import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import useFirebase from '../../hooks/useFirebase';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({ children, ...rest }) => {
    const { user } = useFirebase();
    const location = useLocation();
    const isLoading = false
    console.log('userdetails', user)
    if (isLoading) {
        return <div>
            <LoadingSpinner />
        </div>
    }
    if (user.email) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;