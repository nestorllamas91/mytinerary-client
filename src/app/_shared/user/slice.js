import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk('user/register', async (user, { rejectWithValue }) => {
  try {
    const url = '/api/users/register';
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const res = await axios.post(url, user, config);
    return res.data;
  } catch (err) {
    if (!err.response) throw err;
    return rejectWithValue(err.response.data);
  }
});

export const logInUser = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const url = '/api/users/login';
    const res = await axios.post(url, credentials);
    return res.data;
  } catch (err) {
    if (!err.response) throw err;
    return rejectWithValue(err.response.data);
  }
});

export const logOutUser = createAsyncThunk('user/logout', async (token, { rejectWithValue }) => {
  try {
    const url = '/api/users/logout';
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axios.post(url, undefined, config);
    return res.data;
  } catch (err) {
    if (!err.response) throw err;
    return rejectWithValue(err.response.data);
  }
});

// export const authenticateUserTest = createAsyncThunk('user/authenticate/test', async (token, { rejectWithValue }) => {
//   try {
//     const url = '/api/users/auth';
//     const config = { headers: { Authorization: `Bearer ${token}` } };
//     const res = await axios.post(url, undefined, config);
//     return res.data;
//   } catch (err) {
//     if (!err.response) throw err;
//     return rejectWithValue(err.response.data);
//   }
// });

const sliceUser = createSlice({
  name: 'user',
  initialState: { userIsLoading: false, userData: null, userError: null, userIsAuthenticated: false },
  reducers: {
    loadUser: (state, { payload }) => {
      return { ...state, userIsLoading: false, userData: payload, userError: null, userIsAuthenticated: true };
    },
    resetUser: state => {
      return { ...state, userIsLoading: false, userData: null, userError: null, userIsAuthenticated: false };
    }
  },
  extraReducers: {
    [registerUser.pending]: state => {
      return { ...state, userIsLoading: true, userData: null, userError: null, userIsAuthenticated: false };
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      return { ...state, userIsLoading: false, userData: payload, userError: null, userIsAuthenticated: false };
    },
    [registerUser.rejected]: (state, { payload }) => {
      return { ...state, userIsLoading: false, userData: null, userError: payload, userIsAuthenticated: false };
    },
    [logInUser.pending]: state => {
      return { ...state, userIsLoading: true, userData: null, userError: null, userIsAuthenticated: false };
    },
    [logInUser.fulfilled]: (state, { payload }) => {
      return { ...state, userIsLoading: false, userData: payload, userError: null, userIsAuthenticated: false };
    },
    [logInUser.rejected]: (state, { payload }) => {
      return { ...state, userIsLoading: false, userData: null, userError: payload, userIsAuthenticated: false };
    },
    [logOutUser.pending]: state => {
      return { ...state, userIsLoading: true, userData: null, userError: null, userIsAuthenticated: false };
    },
    [logOutUser.fulfilled]: state => {
      return { ...state, userIsLoading: false, userData: null, userError: null, userIsAuthenticated: false };
    },
    [logOutUser.rejected]: (state, { payload }) => {
      return { ...state, userIsLoading: false, userData: null, userError: payload, userIsAuthenticated: false };
    }
  }
});

const { actions, reducer } = sliceUser;
export const { resetUser, loadUser } = actions;
export default reducer;
