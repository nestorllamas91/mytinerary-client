import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const readDataCitiesPage = createAsyncThunk('citiesPage/readData', async (arg, { rejectWithValue }) => {
  try {
    const url1 = '/api/cities';
    const res1 = await axios.get(url1);
    const url2 = '/api/countries';
    const res2 = await axios.get(url2);
    return { cities: res1.data, countries: res2.data };
  } catch (err) {
    if (!err.response) throw err;
    return rejectWithValue(err.response.data);
  }
});

const sliceCitiesPage = createSlice({
  name: 'citiesPage',
  initialState: { citiesPageIsLoading: false, citiesPageData: null, citiesPageError: null },
  reducers: {},
  extraReducers: {
    [readDataCitiesPage.pending]: state => {
      return { ...state, citiesPageIsLoading: true, citiesPageData: null, citiesPageError: null };
    },
    [readDataCitiesPage.fulfilled]: (state, { payload }) => {
      return { ...state, citiesPageIsLoading: false, citiesPageData: payload, citiesPageError: null };
    },
    [readDataCitiesPage.rejected]: (state, { payload }) => {
      return { ...state, citiesPageIsLoading: false, citiesPageData: null, citiesPageError: payload };
    }
  }
});

export default sliceCitiesPage.reducer;
