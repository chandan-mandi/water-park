import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, Route, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
// import { Redirect, Route } from 'react-router';
// import useAuth from '../../../components/hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
const AdminRoute = ({ children, ...rest }) => {
    const { user, admin, isLoading } = useAuth();
    console.log("admin route user details",admin);
    const location = useLocation();
    if (isLoading) {
        return <div>
            <LoadingSpinner />
        </div>
    }
    if (user.email && admin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} />;
};

export default AdminRoute;