import React from 'react';
import { selectIsLoggedIn } from 'redux/auth/auth-selectors';

import { Navigate } from 'react-router';
import { useAppSelector } from 'redux/hooks';

interface PrivateRouteProps {
  redirectTo: string;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  redirectTo,
}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
