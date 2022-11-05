import { NavLink, Outlet } from 'react-router-dom';
import { Flex, Spacer, Button } from '@chakra-ui/react';
// import { Header, HeaderLink } from './Layout.styled';
import { logOutUser } from '../redux/auth/auth-operations';
import { selectIsLoggedIn, selectUser } from '../redux/auth/auth-selectors';
import { useDispatch, useSelector } from 'react-redux';
const Layout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <>
      <Flex as="header" bg="green.900" color="#262626" py={25}>
        <Button colorScheme="teal" variant="ghost">
          <NavLink to="/goit-react-hw-08-phonebook">Home</NavLink>
        </Button>
        {isLoggedIn && (
          <Button colorScheme="teal" variant="ghost">
            <NavLink to="contacts">Contact Book</NavLink>
          </Button>
        )}
        <Spacer />
        {!isLoggedIn ? (
          <>
            <Button colorScheme="teal" variant="ghost">
              <NavLink to="login">Sign In</NavLink>
            </Button>
            <Button colorScheme="teal" variant="ghost">
              <NavLink to="registration">Sign Up</NavLink>
            </Button>
          </>
        ) : (
          <>
            <p>Hello, {user.name}</p>
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={() => dispatch(logOutUser())}
            >
              Sign Out
              {/* <NavLink to="registration">Sign Out</NavLink> */}
            </Button>
          </>
        )}
      </Flex>
      <Outlet />
    </>
  );
};

export default Layout;
