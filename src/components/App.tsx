import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useEffect, lazy } from 'react';
import { refreshUser } from 'redux/auth/auth-operations';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { ToastContainer } from 'react-toastify';
import { selectIsRefreshing } from 'redux/auth/auth-selectors';
import 'react-toastify/dist/ReactToastify.css';

const Home = lazy(() => import('pages/Home'));
const SignUp = lazy(() => import('pages/SignUp'));
const SignIn = lazy(() => import('pages/SignIn'));
const Contacts = lazy(() => import('pages/Contacts'));

export const App = () => {
  const isLoading = useAppSelector(selectIsRefreshing);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {!isLoading && (
        <>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="login"
                element={
                  <PublicRoute redirectTo="/contacts">
                    <SignIn />
                  </PublicRoute>
                }
              />
              <Route
                path="registration"
                element={
                  <PublicRoute redirectTo="/contacts">
                    <SignUp />
                  </PublicRoute>
                }
              />
              <Route
                path="contacts"
                element={
                  <PrivateRoute redirectTo="/registration">
                    <Contacts />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<h1>Page Not Found 🥶</h1>} />
            </Route>
          </Routes>
          <ToastContainer
            theme="colored"
            position="top-right"
            autoClose={3000}
            closeOnClick
            pauseOnFocusLoss
            draggable
          />
        </>
      )}
    </>
  );
};
