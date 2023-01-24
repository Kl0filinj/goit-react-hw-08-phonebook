import { RootState } from "redux/store";

export const selectContacts = (state: RootState) => state.contacts.contacts.items;

export const selectError = (state: RootState) => state.contacts.contacts.error;

export const selectLoadingState = (state: RootState) => state.contacts.contacts.isLoading;
