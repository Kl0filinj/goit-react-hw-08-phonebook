import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

// Utility to add JWT

// Utility to remove JWT

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const responce = await axios.post('/users/signup', credentials);
      // После успешной регистрации добавляем токен
      token.set(responce.data.token);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logInUser = createAsyncThunk(
  'auth/logIn',
  async (credentials, thunkAPI) => {
    try {
      const responce = await axios.post('/users/login', credentials);
      // После успешной logIn добавляем токен
      token.set(responce.data.token);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'auth/logOut',
  async (_, thunkAPI) => {
    try {
      await axios.post('/users/logout');
      // После успешной logOut добавляем токен
      token.unset();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
