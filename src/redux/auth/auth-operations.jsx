import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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
      toast.success(`Registration was successful`);
      return responce.data;
    } catch (error) {
      toast.error('Incorrect data for registration, try again');
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
      toast.success(`Welcome back to your contact book`);
      return responce.data;
    } catch (error) {
      toast.error('Incorrect password or email, try again');
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
      toast.success(`You have successfully logged out of your account`);
    } catch (error) {
      toast.error('Something goes wrong, try again');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    console.log(state);
    const savedToken = state.auth.token;
    if (savedToken === null) {
      return thunkAPI.rejectWithValue('Can`t fetch with current user ^_^');
    }
    try {
      token.set(savedToken);
      const responce = await axios.get('/users/current');

      return responce.data;
    } catch (error) {
      toast.error('Something goes wrong, try again');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
