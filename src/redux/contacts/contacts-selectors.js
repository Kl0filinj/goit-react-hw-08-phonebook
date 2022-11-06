export const selectContacts = state => state.contacts.contacts.items;

export const selectError = state => state.contacts.contacts.error;

export const selectLoadingState = state => state.contacts.contacts.isLoading;
