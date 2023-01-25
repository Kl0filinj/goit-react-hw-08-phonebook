import React from 'react';
import { selectIsLoggedIn } from 'redux/auth/auth-selectors';

import { Navigate } from 'react-router';
import { useAppSelector } from 'redux/hooks';

interface PublicRouteProps {
  redirectTo: string;
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children, redirectTo }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
