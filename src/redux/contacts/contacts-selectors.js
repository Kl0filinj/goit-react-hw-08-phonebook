import { createSelector } from '@reduxjs/toolkit';

// export const selectFilter = state => state.contacts.contacts;

export const selectContacts = state => state.contacts.contacts.items;

export const selectError = state => state.contacts.contacts.error;

export const selectLoadingState = state => state.contacts.contacts.isLoading;

// export const selectVisibleList = createSelector(
//   [selectContacts, selectFilter],
//   (contactsList, filter) =>
//     contactsList.filter(item => item.name.toLowerCase().includes(filter))
// );
