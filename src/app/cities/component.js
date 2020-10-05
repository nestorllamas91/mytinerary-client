import React, { Fragment, useState, useEffect } from 'react';
import styles, { stylesMaterialUi } from '$client/app/cities/styles';

import { useSelector, useDispatch } from 'react-redux';
import { readDataCitiesPage } from '$client/app/cities/slice';

import City from '$client/app/cities/city/component';
import LinearProgress from '@material-ui/core/LinearProgress';
import Input from '@material-ui/core/Input';

export default function CitiesPage() {
  const { citiesPageIsLoading, citiesPageData, citiesPageError } = useSelector(({ citiesPage }) => citiesPage);
  const countries = citiesPageData ? citiesPageData.countries.output.data : [];
  const dispatch = useDispatch();
  const [citiesFiltered, setCitiesFiltered] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const classes = stylesMaterialUi();

  useEffect(() => {
    dispatch(readDataCitiesPage());
  }, []);

  useEffect(() => {
    if (citiesPageData) {
      const cities = citiesPageData.cities.output.data;
      setCitiesFiltered(cities.filter(city => city.name.toLowerCase().startsWith(searchTerm.toLocaleLowerCase())));
    }
  }, [citiesPageData, searchTerm]);

  function handleFilter(e) {
    setSearchTerm(e.target.value);
  }

  if (!citiesPageIsLoading && !citiesFiltered && !citiesPageError) {
    return null;
  }

  return (
    <div className="main-container">
      {citiesPageIsLoading ? (
        <LinearProgress />
      ) : (
        <Fragment>
          <div className="cities-filter">
            <label>Filter the cities:</label>
            <Input
              id="cities-filter"
              name="citiesFilter"
              type="text"
              disabled={citiesPageError ? true : false}
              value={searchTerm}
              onChange={handleFilter}
              classes={{ input: citiesPageError ? classes.filterInputDisabled : null }}
            />
          </div>
          {citiesPageError ? (
            <span className="alert alert-error">
              Error: {citiesPageError.status.code} {citiesPageError.status.name}
            </span>
          ) : citiesFiltered.length === 0 ? (
            <span className="alert alert-info">No city has been found.</span>
          ) : (
            <Fragment>
              <span className="alert alert-success">{citiesFiltered.length} cities have been found.</span>
              <div className="cities">
                {citiesFiltered.map(city => {
                  const country = countries.find(country => country.countryId === city.countryId);
                  return (
                    <City
                      key={city.cityId}
                      cityId={city.cityId}
                      cityName={city.name}
                      countryId={country.countryId}
                      countryShortName={country.shortName}
                      isLink={true}
                    />
                  );
                })}
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
      <style jsx>{styles}</style>
    </div>
  );
}
