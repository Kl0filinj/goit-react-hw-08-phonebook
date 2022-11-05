import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from 'pages/Home';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from 'redux/auth/auth-operations';
import Contacts from 'pages/Contacts';
export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="goit-react-hw-08-phonebook/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<SignIn />} />
        <Route path="registration" element={<SignUp />} />
        <Route path="contacts" element={<Contacts />} />
        {/* <Route path="movies" element={<Movies />} />
        <Route path="movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route> */}
        <Route path="*" element={<h1>Page Not Found 🥶</h1>} />
      </Route>
    </Routes>
  );
};
