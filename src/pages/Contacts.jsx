import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';
import ChangeModal from 'components/Modal';
import { DeleteIcon } from '@chakra-ui/icons';
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

const Contacts = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();
  const contactsList = useSelector(selectContacts);

  const visibleContacts = contactsList.filter(item =>
    item.name.toLowerCase().includes(filter)
  );

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
    <Container as="main" bg="blue.800" maxW="full" color="white">
      <Heading
        textAlign="center"
        pt="7"
        pb="20"
        fontFamily="heading"
        fontWeight="medium"
      >
        Let`s create new contacts together !
      </Heading>
      <Container
        maxW="container.xl"
        display="flex"
        justifyContent="space-between"
      >
        <Box flexGrow="1" display="flex" justifyContent="center">
          <Box
            w="md"
            h="fit-content"
            borderRadius="lg"
            bg="gray.700"
            paddingY="5"
            paddingX="7"
          >
            <Heading
              as="h2"
              mb="6"
              textAlign="center"
              fontFamily="heading"
              fontWeight="medium"
            >
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

              <Box textAlign="center" marginY="5">
                <Button colorScheme="blue" variant="solid" type="submit">
                  Add Contatc
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
        <Box flexGrow="1" display="flex" justifyContent="center">
          <Box
            w="lg"
            h="fit-content"
            borderRadius="lg"
            bg="gray.700"
            paddingY="5"
            paddingX="7"
          >
            <Heading
              as="h2"
              mb="6"
              textAlign="center"
              fontFamily="heading"
              fontWeight="medium"
            >
              Contact List
            </Heading>
            <Input
              type="text"
              value={filter}
              onChange={evt => setFilter(evt.target.value)}
            />
            <ul>
              {visibleContacts.map(({ name, number, id }) => (
                <Box
                  as="li"
                  key={id}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="baseline"
                  mt="5"
                >
                  <Text
                    fontSize="2xl"
                    fontWeight="medium"
                    letterSpacing="wide"
                    display="flex"
                    flexWrap="wrap"
                  >
                    {name}: {number}
                  </Text>
                  <Box>
                    <Button
                      variant="outline"
                      onClick={() => dispatch(deleteContact(id))}
                    >
                      <DeleteIcon />
                    </Button>
                    <ChangeModal contactId={id} />
                    {/* <Button
                      variant="outline"
                      ml="1.5"
                      // onClick={() =>
                      //   dispatch(updateContact({ name, number, id })
                      //   )
                      // }
                    >
                      <EditIcon />
                    </Button> */}
                  </Box>
                </Box>
              ))}
            </ul>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default Contacts;
