import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const readDataCountries = createAsyncThunk('countries/readData', async (arg, { rejectWithValue }) => {
  try {
    const url = '/api/countries';
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    if (!err.response) throw err;
    return rejectWithValue(err.response.data);
  }
});

const sliceCountries = createSlice({
  name: 'countries',
  initialState: { countriesIsLoading: false, countriesData: null, countriesError: null },
  reducers: {},
  extraReducers: {
    [readDataCountries.pending]: state => {
      return { ...state, countriesIsLoading: true, countriesData: null, countriesError: null };
    },
    [readDataCountries.fulfilled]: (state, { payload }) => {
      return { ...state, countriesIsLoading: false, countriesData: payload, countriesError: null };
    },
    [readDataCountries.rejected]: (state, { payload }) => {
      return { ...state, countriesIsLoading: false, countriesData: null, countriesError: payload };
    }
  }
});

export default sliceCountries.reducer;
