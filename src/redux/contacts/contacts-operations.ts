import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IContact, INewContact } from 'types/contactsTypes';
import { axiosError, ErrorStatusAndMessage } from 'redux/errorHandlingTypes/rejectErrorTypes';

export const fetchAllContacts = createAsyncThunk<IContact, void, { rejectValue: ErrorStatusAndMessage }>(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      toast.error('Something goes wrong, try again');
      return thunkAPI.rejectWithValue(axiosError(error));
    }
  }
);

export const addContact = createAsyncThunk<IContact, INewContact, { rejectValue: ErrorStatusAndMessage }>(
  'contacts/add',
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { name, number });
      toast.success(`Contact added`);
      return response.data;
    } catch (error) {
      toast.error('We couldn`t add a contact, try again');
      return thunkAPI.rejectWithValue(axiosError(error));
    }
  }
);

export const deleteContact = createAsyncThunk<string, string, { rejectValue: ErrorStatusAndMessage }>(
  'contacts/delete',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      toast.success(`Contact deleted`);
      return response.data;
    } catch (error) {
      toast.error('We couldn`t delete a contact, try again');
      return thunkAPI.rejectWithValue(axiosError(error));
    }
  }
);

export const updateContact = createAsyncThunk<IContact, IContact, { rejectValue: ErrorStatusAndMessage }>(
  'contacts/update',
  async ({ name, number, id }, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${id}`, { name, number });
      toast.success(`Contact updated`);
      return response.data;
    } catch (error) {
      toast.error('We couldn`t update a contact, try again');
      return thunkAPI.rejectWithValue(axiosError(error));
    }
  }
);
