import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  logInUser,
  logOutUser,
  refreshUser,
} from './auth-operations';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

// const handlePending = state => {
//   state.isRefreshing = true;
// };

export const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  extraReducers: {
    [registerUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logInUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logOutUser.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [refreshUser.pending](state) {
      state.isRefreshing = true;
    },
    [refreshUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    [refreshUser.rejected](state) {
      state.isRefreshing = false;
    },
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

// export const { addTask, deleteTask } = authSlice.actions;
// export const authReducer = authSlice.reducer;
export const authReducer = persistReducer(persistConfig, authSlice.reducer);
