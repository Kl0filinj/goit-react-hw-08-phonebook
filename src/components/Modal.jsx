import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Box,
} from '@chakra-ui/react';
import { updateContact } from 'redux/contacts/contacts-operations';
import { EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const ChangeModal = ({ contactId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const dispatch = useDispatch();

  const handleConatctChange = evt => {
    evt.preventDefault();
    dispatch(
      updateContact({ name: newName, number: newNumber, id: contactId })
    );
    onClose();
  };

  return (
    <>
      <Button variant="outline" ml="1.5" onClick={onOpen}>
        <EditIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form autoComplete="false" onSubmit={handleConatctChange}>
              <FormControl isRequired>
                <FormLabel>New Number</FormLabel>
                <Input
                  type="tel"
                  value={newNumber}
                  onChange={evt => setNewNumber(evt.target.value)}
                />
                <FormHelperText>For example: +380 95 122 0366</FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>New Name</FormLabel>
                <Input
                  type="text"
                  value={newName}
                  onChange={evt => setNewName(evt.target.value)}
                />
                <FormHelperText>For example: Amalia Rorshekh</FormHelperText>
              </FormControl>

              <Box textAlign="center" marginY="5">
                <Button colorScheme="blue" variant="solid" type="submit">
                  Change Contact
                </Button>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeModal;
