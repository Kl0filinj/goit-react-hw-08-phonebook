import { NavLink, Outlet } from 'react-router-dom';
import { Flex, Spacer, Button } from '@chakra-ui/react';
// import { Header, HeaderLink } from './Layout.styled';

const Layout = () => {
  return (
    <>
      <Flex as="header" maxW="full" bg="green.900" color="#262626" py={25}>
        <Button colorScheme="teal" variant="ghost">
          <NavLink to="/goit-react-hw-08-phonebook">Home</NavLink>
        </Button>
        <Spacer />
        <Button colorScheme="teal" variant="ghost">
          <NavLink to="login">Sign In</NavLink>
        </Button>
        <Button colorScheme="teal" variant="ghost">
          <NavLink to="registration">Sign Up</NavLink>
        </Button>
      </Flex>
      <Outlet />
    </>
  );
};

export default Layout;
