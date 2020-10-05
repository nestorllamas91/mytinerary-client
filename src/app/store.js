import { configureStore } from '@reduxjs/toolkit';
import reducerCountries from '$client/app/_shared/countries/slice';
import reducerCitiesPage from '$client/app/cities/slice';
import reducerItinerariesPage from '$client/app/itineraries/slice';
import reducerActivitiesSection from '$client/app/itineraries/itinerary/itinerary-body/activities/slice';
import reducerUser from '$client/app/_shared/user/slice';

export default configureStore({
  reducer: {
    countries: reducerCountries,
    citiesPage: reducerCitiesPage,
    itinerariesPage: reducerItinerariesPage,
    activitiesSection: reducerActivitiesSection,
    user: reducerUser
  },
  preloadedState: {
    countries: { countriesIsLoading: false, countriesData: null, countriesError: null },
    citiesPage: { citiesPageIsLoading: false, citiesPageData: null, citiesPageError: null },
    itinerariesPage: { itinerariesPageIsLoading: false, itinerariesPageData: null, itinerariesPageError: null },
    activitiesSection: { activitiesPageIsLoading: false, activitiesPageData: null, activitiesPageError: null },
    user: { userIsLoading: false, userData: null, userError: null, userIsAuthenticated: false }
  }
});
