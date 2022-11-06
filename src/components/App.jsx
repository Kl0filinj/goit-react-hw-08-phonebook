import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from 'pages/Home';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from 'redux/auth/auth-operations';
import Contacts from 'pages/Contacts';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="goit-react-hw-08-phonebook/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="login"
          element={
            <PublicRoute
              redirectTo="/goit-react-hw-08-phonebook/contacts"
              component={<SignIn />}
            />
          }
        />
        <Route
          path="registration"
          element={
            <PublicRoute
              redirectTo="/goit-react-hw-08-phonebook/contacts"
              component={<SignUp />}
            />
          }
        />
        <Route
          path="contacts"
          element={
            <PrivateRoute
              redirectTo="/goit-react-hw-08-phonebook/registration"
              component={<Contacts />}
            />
          }
        />

        <Route path="*" element={<h1>Page Not Found 🥶</h1>} />
      </Route>
    </Routes>
  );
};
