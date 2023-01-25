import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IEnterData, IEnterDataForRegistration, IEnterInPayload, IUser } from 'types/authTypes';
import { axiosError, ErrorStatusAndMessage } from 'redux/errorHandlingTypes/rejectErrorTypes';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

// Utility to add JWT

// Utility to remove JWT

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const registerUser = createAsyncThunk<IEnterInPayload, IEnterDataForRegistration, { rejectValue: ErrorStatusAndMessage }>(
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
      throw thunkAPI.rejectWithValue(axiosError(error));
    }
  }
);

export const logInUser = createAsyncThunk<IEnterInPayload, IEnterData, { rejectValue: ErrorStatusAndMessage }>(
  'auth/logIn',
  async (credentials, thunkAPI) => {
    try {
      const responce = await axios.post('/users/lo', credentials);
      // После успешной logIn добавляем токен
      token.set(responce.data.token);
      toast.success(`Welcome back to your contact book`);
      return responce.data;
    } catch (error) {
      console.log(error)
      toast.error('Incorrect password or email, try again');
      throw thunkAPI.rejectWithValue(axiosError(error));
    }
  }
);

export const logOutUser = createAsyncThunk<void, void, { rejectValue: ErrorStatusAndMessage }>(
  'auth/logOut',
  async (_, thunkAPI) => {
    try {
      await axios.post('/users/logout');
      // После успешной logOut добавляем токен
      token.unset();
      toast.success(`You have successfully logged out of your account`);
    } catch (error) {
      toast.error('Something goes wrong, try again');
      throw thunkAPI.rejectWithValue(axiosError(error));
    }
  }
);

export const refreshUser = createAsyncThunk<IUser, void, { rejectValue: ErrorStatusAndMessage }>(
  'auth/refresh',
  async (_, thunkAPI) => {
    // @
    const state: any = thunkAPI.getState();
      const savedToken = state.auth.token;
    
    if (savedToken === null) {
      throw thunkAPI.rejectWithValue({message: 'Can`t fetch with current user ^_^'});
    }
      
    try {
      token.set(savedToken);
      const responce = await axios.get('/users/current');
      return responce.data;
    } catch (error) {
      toast.error('Something goes wrong, try again');
      throw thunkAPI.rejectWithValue(axiosError(error));
    }
  }
);
