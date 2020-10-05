import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const readDataActivitiesSection = createAsyncThunk(
  'activitiesSection/readData',
  async (itineraryId, { rejectWithValue }) => {
    try {
      const url = `/api/itineraries/${itineraryId}/activities`;
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

const sliceActivitiesSection = createSlice({
  name: 'activitiesSection',
  initialState: { activitiesSectionIsLoading: false, activitiesSectionData: null, activitiesSectionError: null },
  reducers: {},
  extraReducers: {
    [readDataActivitiesSection.pending]: state => {
      return { ...state, activitiesSectionIsLoading: true, activitiesSectionData: null, activitiesSectionError: null };
    },
    [readDataActivitiesSection.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        activitiesSectionIsLoading: false,
        activitiesSectionData: payload,
        activitiesSectionError: null
      };
    },
    [readDataActivitiesSection.rejected]: (state, { payload }) => {
      return {
        ...state,
        activitiesSectionIsLoading: false,
        activitiesSectionData: null,
        activitiesSectionError: payload
      };
    }
  }
});

export default sliceActivitiesSection.reducer;
