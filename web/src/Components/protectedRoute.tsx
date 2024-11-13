import React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for token

  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
