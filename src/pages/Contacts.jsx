import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import {
  fetchAllContacts,
  addContact,
  deleteContact,
} from 'redux/contacts/contacts-operations';
import { selectContacts } from 'redux/contacts/contacts-selectors';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { number } from 'yup';

const Contacts = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const contactsList = useSelector(selectContacts);
  const addContactHandler = evt => {
    evt.preventDefault();
    dispatch(addContact({ name, number: phone }));
    setPhone('');
    setName('');
  };

  useEffect(() => {
    console.log('Fetch All');
    dispatch(fetchAllContacts());
  }, [dispatch]);

  return (
    <Container
      as="main"
      bg="green.400"
      h="calc(100vh - 90px)"
      maxW="full"
      color="white"
    >
      <Heading textAlign="center">Let`s create new contacts together !</Heading>
      <Container
        maxW="container.xl"
        display="flex"
        justifyContent="space-between"
      >
        <Box flexGrow="1">
          <Box w="md" minH="3xs" borderRadius="lg" bg="green.900">
            <Heading as="h2" textAlign="center">
              Add new contact
            </Heading>
            <form autoComplete="false" onSubmit={addContactHandler}>
              <FormControl isRequired>
                <FormLabel>Number</FormLabel>
                <Input
                  type="tel"
                  value={phone}
                  onChange={evt => setPhone(evt.target.value)}
                />
                <FormHelperText>For example: +380 95 122 0366</FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={evt => setName(evt.target.value)}
                />
                <FormHelperText>For example: Amalia Rorshekh</FormHelperText>
              </FormControl>

              <Button colorScheme="teal" variant="ghost" type="submit">
                Add
              </Button>
            </form>
          </Box>
        </Box>
        <Box flexGrow="1">
          <Box w="lg" minH="7.3rem" borderRadius="lg" bg="green.900">
            <Heading as="h2" textAlign="center">
              Contact List
            </Heading>
            <ul>
              {contactsList.map(({ name, number, id }) => (
                <li key={id}>
                  <p>
                    {name}: {number}
                  </p>
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default Contacts;
