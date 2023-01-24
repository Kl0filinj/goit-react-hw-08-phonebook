import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  registerUser,
  logInUser,
  logOutUser,
  refreshUser,
} from './auth-operations';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { IEnterInPayload, IUser } from 'types/authTypes';

interface IAuthState {
  user: IUser;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

const authState: IAuthState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  extraReducers: {
    [registerUser.fulfilled.type](
      state,
      action: PayloadAction<IEnterInPayload>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logInUser.fulfilled.type](state, action: PayloadAction<IEnterInPayload>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logOutUser.fulfilled.type](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [refreshUser.pending.type](state) {
      state.isRefreshing = true;
    },
    [refreshUser.fulfilled.type](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    [refreshUser.rejected.type](state) {
      state.isRefreshing = false;
    },
  },
  reducers: {},
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

// export const { addTask, deleteTask } = authSlice.actions;
// export const authReducer = authSlice.reducer;
export const authReducer = persistReducer(persistConfig, authSlice.reducer);
