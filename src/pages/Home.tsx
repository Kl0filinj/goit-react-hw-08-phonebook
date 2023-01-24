import React from 'react';
import { Center, Heading } from '@chakra-ui/react';

const Home: React.FC = () => {
  return (
    <Center as="main" bg="blue.800" color="white" py="16">
      <Heading as="h1" fontFamily="heading">
        Welcome back to Contact Book !
      </Heading>
    </Center>
  );
};

export default Home;
