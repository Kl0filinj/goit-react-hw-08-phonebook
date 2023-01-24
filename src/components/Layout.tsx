import { NavLink, Outlet } from 'react-router-dom';
import { Flex, Spacer, Button, Text, Avatar, Box } from '@chakra-ui/react';
import { logOutUser } from '../redux/auth/auth-operations';
import { selectIsLoggedIn, selectUser } from 'redux/auth/auth-selectors';
// import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import { Suspense } from 'react';

const Layout: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <>
      <Flex as="header" bg="gray.700" color="#262626" p="6">
        <Button colorScheme="blackAlpha" color="white" variant="ghost" ml="2">
          <NavLink to="/goit-react-hw-08-phonebook">Home</NavLink>
        </Button>
        {isLoggedIn && (
          <Button colorScheme="blackAlpha" color="white" variant="ghost" ml="2">
            <NavLink to="contacts">Contact Book</NavLink>
          </Button>
        )}
        <Spacer />
        {!isLoggedIn ? (
          <>
            <Button
              colorScheme="blackAlpha"
              color="white"
              variant="ghost"
              ml="2"
            >
              <NavLink to="login">Sign In</NavLink>
            </Button>
            <Button
              colorScheme="blackAlpha"
              color="white"
              variant="ghost"
              ml="2"
            >
              <NavLink to="registration">Sign Up</NavLink>
            </Button>
          </>
        ) : (
          <Box display="flex" alignItems="center">
            <Avatar
              mr="2"
              w="8"
              h="8"
              src="https://bit.ly/broken-link"
              name={user.name!}
            />
            <Text
              fontSize="xl"
              fontWeight="medium"
              letterSpacing="wide"
              color="white"
              mr="2"
            >
              Hello, <Text as="b">{user.name}</Text>
            </Text>
            <Button
              colorScheme="blackAlpha"
              color="white"
              variant="ghost"
              mr="2"
              onClick={() => dispatch(logOutUser())}
            >
              Sign Out
            </Button>
          </Box>
        )}
      </Flex>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
