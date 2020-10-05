import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import styles from '$client/app/cities/city/styles';

import { useLocation, useRouteMatch, Link } from 'react-router-dom';

import * as images_cities from '$client/app/cities/images';
import * as images_countries_flags from '$client/app/_shared/countries/images';

function City({ cityId, cityName, countryId, countryShortName, isLink }) {
  const { pathname } = useLocation();
  const match = useRouteMatch('/cities/:cityId');
  const { classNameCity, classNameCityImage, classNameCityData } = getClassNamesByPath(pathname, match);

  return (
    <div className={`city-container ${classNameCity}`}>
      {isLink ? (
        <Link to={`/cities/${cityId}`}>
          <CityChild
            cityId={cityId}
            cityName={cityName}
            countryId={countryId}
            countryShortName={countryShortName}
            classNameCityImage={classNameCityImage}
            classNameCityData={classNameCityData}
          />
        </Link>
      ) : (
        <CityChild
          cityId={cityId}
          cityName={cityName}
          countryId={countryId}
          countryShortName={countryShortName}
          classNameCityImage={classNameCityImage}
          classNameCityData={classNameCityData}
        />
      )}
      <style jsx>{styles}</style>
    </div>
  );
}

City.propTypes = {
  cityId: PropTypes.number.isRequired,
  cityName: PropTypes.string.isRequired,
  countryId: PropTypes.number.isRequired,
  countryShortName: PropTypes.string.isRequired,
  isLink: PropTypes.bool.isRequired
};

export default memo(City);

function CityChild({ cityId, cityName, countryId, countryShortName, classNameCityImage, classNameCityData }) {
  return (
    <Fragment>
      <img src={images_cities[`image_city${cityId}`]} alt={cityName} className={`city-image ${classNameCityImage}`} />
      <div className={`city-data ${classNameCityData}`}>
        <span className="city-name">{cityName}</span>
        <div className="country">
          <img
            src={images_countries_flags[`image_country${countryId}`]}
            alt={countryShortName}
            className="image-country-flag"
          />
          <span>{countryShortName}</span>
        </div>
      </div>
      <style jsx>{styles}</style>
    </Fragment>
  );
}

CityChild.propTypes = {
  cityId: PropTypes.number.isRequired,
  cityName: PropTypes.string.isRequired,
  countryId: PropTypes.number.isRequired,
  countryShortName: PropTypes.string.isRequired,
  classNameCityImage: PropTypes.string.isRequired,
  classNameCityData: PropTypes.string.isRequired
};

function getClassNamesByPath(pathname, match) {
  let classNameCity = '';
  let classNameCityImage = '';
  let classNameCityData = '';
  if (pathname === '/') {
    classNameCity = 'city-small';
    classNameCityData = 'city-data-small';
  }
  if (pathname === '/cities' || match) {
    classNameCity = 'city-big';
    classNameCityImage = 'city-image-big';
    classNameCityData = 'city-data-big';
  }

  return { classNameCity, classNameCityImage, classNameCityData };
}
