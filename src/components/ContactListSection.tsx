import { Box, Heading, Input, Button, Text, Skeleton } from '@chakra-ui/react';
import ChangeModal from 'components/Modal';
import { DeleteIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { deleteContact } from 'redux/contacts/contacts-operations';
import { selectContacts } from 'redux/contacts/contacts-selectors';
import { selectLoadingState } from 'redux/contacts/contacts-selectors';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const ContactListSection: React.FC = () => {
  const [filter, setFilter] = useState('');

  const dispatch = useAppDispatch();
  const contactsList = useAppSelector(selectContacts);

  const isLoading = useAppSelector(selectLoadingState);

  const visibleContacts = contactsList.filter(item =>
    item.name.toLowerCase().includes(filter)
  );
  return (
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
        <Text textAlign="center" fontSize="lg" fontWeight="light" color="gray">
          Search by Name
        </Text>
        <Input
          type="text"
          value={filter}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
            setFilter(evt.target.value)
          }
        />
        {visibleContacts.length === 0 ? (
          <Skeleton fadeDuration={2} isLoaded={!isLoading}>
            <Box mt="5" display="flex" alignItems="center">
              <Text fontSize="2xl" fontWeight="medium" letterSpacing="wide">
                List of conatcts is empty
              </Text>
              <WarningTwoIcon w="6" h="6" ml="4" color="orange.400" />
            </Box>
          </Skeleton>
        ) : (
          <ul>
            {visibleContacts.map(({ name, number, id }) => (
              <Skeleton fadeDuration={2} isLoaded={!isLoading} key={id}>
                <Box
                  as="li"
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
                    <ChangeModal contactId={id} userData={{ name, number }} />
                  </Box>
                </Box>
              </Skeleton>
            ))}
          </ul>
        )}
      </Box>
    </Box>
  );
};

export default ContactListSection;
