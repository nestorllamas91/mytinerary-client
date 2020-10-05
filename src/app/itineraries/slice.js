import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const readDataItinerariesPage = createAsyncThunk(
  'itinerariesPage/readData',
  async (cityId, { rejectWithValue }) => {
    try {
      const url1 = `/api/cities/${cityId}`;
      const res1 = await axios.get(url1);
      const url2 = `/api/countries/${res1.data.output.data.countryId}`;
      const res2 = await axios.get(url2);
      const url3 = `/api/cities/${cityId}/itineraries`;
      const res3 = await axios.get(url3);
      const url4 = '/api/users';
      const res4 = await axios.get(url4);
      return { city: res1.data, country: res2.data, itineraries: res3.data, users: res4.data };
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

const sliceItinerariesPage = createSlice({
  name: 'itinerariesPage',
  initialState: { itinerariesPageIsLoading: false, itinerariesPageData: null, itinerariesPageError: null },
  reducers: {},
  extraReducers: {
    [readDataItinerariesPage.pending]: state => {
      return { ...state, itinerariesPageIsLoading: true, itinerariesPageData: null, itinerariesPageError: null };
    },
    [readDataItinerariesPage.fulfilled]: (state, { payload }) => {
      return { ...state, itinerariesPageIsLoading: false, itinerariesPageData: payload, itinerariesPageError: null };
    },
    [readDataItinerariesPage.rejected]: (state, { payload }) => {
      return { ...state, itinerariesPageIsLoading: false, itinerariesPageData: null, itinerariesPageError: payload };
    }
  }
});

export default sliceItinerariesPage.reducer;
