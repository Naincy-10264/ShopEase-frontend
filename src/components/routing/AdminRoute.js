import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    toast.error('Please login to access this page');
    return <Navigate to="/login" />;
  }

  if (user?.role !== 'admin') {
    toast.error('You do not have permission to access this page');
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;

