import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {},
});

const persistConfig = {
  key: 'auth',
  storage,
};

// export const { addTask, deleteTask } = contactsSlice.actions;
// export const tasksReducer = taskSlice.reducer;
export const authReducer = persistReducer(persistConfig, authSlice.reducer);
