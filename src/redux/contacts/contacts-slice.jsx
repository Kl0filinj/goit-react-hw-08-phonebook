import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllContacts,
  addContact,
  deleteContact,
  updateContact,
} from './contacts-operations';

const contactsState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
};

const handlePending = state => {
  console.log('It`s from state ', state);
  state.contacts.isLoading = true;
};

const handleRejected = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};

const normalizeState = state => {
  state.contacts.isLoading = false;
  state.contacts.error = null;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsState,
  extraReducers: {
    [fetchAllContacts.pending]: handlePending,
    [fetchAllContacts.fulfilled](state, action) {
      normalizeState(state);
      state.contacts.items = action.payload;
    },
    [fetchAllContacts.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.fulfilled](state, action) {
      normalizeState(state);
      state.contacts.items.push(action.payload);
    },
    [addContact.rejected]: handleRejected,
    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled](state, action) {
      normalizeState(state);
      const index = state.contacts.items.findIndex(
        task => task.id === action.payload.id
      );
      state.contacts.items.splice(index, 1);
    },
    [deleteContact.rejected]: handleRejected,
    [updateContact.pending]: handlePending,
    [updateContact.fulfilled](state, action) {
      normalizeState(state);
      const index = state.contacts.items.findIndex(
        task => task.id === action.payload.id
      );
      console.log(action.payload);
      const id = action.payload.id;
      const name = action.payload.name;
      const number = action.payload.number;
      state.contacts.items.splice(index, 1, { id, name, number });
    },
    [updateContact.rejected]: handleRejected,
  },
});

// export const { addTask, deleteTask } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
