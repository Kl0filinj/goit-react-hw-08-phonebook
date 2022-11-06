import { NavLink, Outlet } from 'react-router-dom';
import { Flex, Spacer, Button, Text, Box } from '@chakra-ui/react';
// import { Header, HeaderLink } from './Layout.styled';
import { logOutUser } from '../redux/auth/auth-operations';
import { selectIsLoggedIn, selectUser } from '../redux/auth/auth-selectors';
import { useDispatch, useSelector } from 'react-redux';
import { StarIcon } from '@chakra-ui/icons';
const Layout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <>
      <Flex as="header" bg="gray.700" color="#262626" p="6">
        <Button colorScheme="blackAlpha" color="white" variant="ghost">
          <NavLink to="/goit-react-hw-08-phonebook">Home</NavLink>
        </Button>
        {isLoggedIn && (
          <Button colorScheme="blackAlpha" color="white" variant="ghost">
            <NavLink to="contacts">Contact Book</NavLink>
          </Button>
        )}
        <Spacer />
        {!isLoggedIn ? (
          <>
            <Button colorScheme="blackAlpha" color="white" variant="ghost">
              <NavLink to="login">Sign In</NavLink>
            </Button>
            <Button colorScheme="blackAlpha" color="white" variant="ghost">
              <NavLink to="registration">Sign Up</NavLink>
            </Button>
          </>
        ) : (
          <Box display="flex" alignItems="baseline">
            <StarIcon color="white" />
            <Text
              fontSize="xl"
              fontWeight="medium"
              letterSpacing="wide"
              color="white"
            >
              Hello, <Text as="b">{user.name}</Text>
            </Text>
            <Button
              colorScheme="blackAlpha"
              color="white"
              variant="ghost"
              onClick={() => dispatch(logOutUser())}
            >
              Sign Out
              {/* <NavLink to="registration">Sign Out</NavLink> */}
            </Button>
          </Box>
        )}
      </Flex>
      <Outlet />
    </>
  );
};

export default Layout;
