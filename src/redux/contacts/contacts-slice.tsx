import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { IContact } from 'types/contactsTypes';
import {
  fetchAllContacts,
  addContact,
  deleteContact,
  updateContact,
} from './contacts-operations';

interface IContactsState {
  items: IContact[];
  isLoading: boolean;
  error: string | null;
}

interface IContactsStateWrapper {
  contacts: IContactsState;
}

const contactsState: IContactsStateWrapper = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
};

const handlePending = (state: WritableDraft<IContactsStateWrapper>) => {
  state.contacts.isLoading = true;
};

const handleRejected = (
  state: WritableDraft<IContactsStateWrapper>,
  action: PayloadAction<string>
) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};

const normalizeState = (state: WritableDraft<IContactsStateWrapper>) => {
  state.contacts.isLoading = false;
  state.contacts.error = null;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsState,
  extraReducers: {
    [fetchAllContacts.pending.type]: handlePending,
    [fetchAllContacts.fulfilled.type](
      state,
      action: PayloadAction<IContact[]>
    ) {
      normalizeState(state);
      state.contacts.items = action.payload;
    },
    [fetchAllContacts.rejected.type]: handleRejected,
    [addContact.fulfilled.type](state, action: PayloadAction<IContact>) {
      normalizeState(state);
      state.contacts.items.push(action.payload);
    },
    [addContact.rejected.type]: handleRejected,

    [deleteContact.fulfilled.type](state, action) {
      normalizeState(state);
      const index = state.contacts.items.findIndex(
        task => task.id === action.payload.id
      );
      state.contacts.items.splice(index, 1);
    },
    [deleteContact.rejected.type]: handleRejected,

    [updateContact.fulfilled.type](state, action) {
      normalizeState(state);
      const index = state.contacts.items.findIndex(
        task => task.id === action.payload.id
      );
      const id = action.payload.id;
      const name = action.payload.name;
      const number = action.payload.number;
      state.contacts.items.splice(index, 1, { id, name, number });
    },
    [updateContact.rejected.type]: handleRejected,
  },
  reducers: {},
});

export const contactsReducer = contactsSlice.reducer;
