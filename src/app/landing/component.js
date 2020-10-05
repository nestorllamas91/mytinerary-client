import React, { Fragment, useEffect } from 'react';
import styles, { stylesGlobal } from '$client/app/landing/styles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { readDataCitiesPage } from '$client/app/cities/slice';

import City from '$client/app/cities/city/component';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slider from 'react-slick';
import image_logo from '$client/assets/images/misc/logo.png';
import image_explore from '$client/assets/images/misc/explore.png';

export default function LandingPage() {
  const { citiesPageIsLoading, citiesPageData, citiesPageError } = useSelector(({ citiesPage }) => citiesPage);
  const citiesPopular = citiesPageData ? citiesPageData.cities.output.data.slice(0, 12) : [];
  const countries = citiesPageData ? citiesPageData.countries.output.data : [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readDataCitiesPage());
  }, []);

  return (
    <div className="main-container landing-margin-bottom">
      {citiesPageIsLoading ? (
        <LinearProgress />
      ) : (
        <Fragment>
          <div className="logo">
            <h1>MYtinerary</h1>
            <img src={image_logo} alt="Logo" />
          </div>
          <div className="slogan">
            <span>Find your perfect trip, designed by insiders who know and love their cities.</span>
          </div>
          <div className="explore-cities">
            <span>Start exploring...</span>
            <Link to="/cities">
              <img src={image_explore} alt="Explore" />
            </Link>
          </div>
          <div className="popular-mytineraries">
            <h3>Popular MYtineraries</h3>
            {citiesPageError ? (
              <span className="alert alert-error">
                Error: {citiesPageError.status.code} {citiesPageError.status.name}
              </span>
            ) : citiesPopular.length === 0 ? (
              <span className="alert alert-info">No city has been found.</span>
            ) : (
              <Slider
                autoplay={true}
                autoplaySpeed={5000}
                speed={1000}
                rows={2}
                slidesToShow={2}
                slidesToScroll={2}
                dots={true}
              >
                {citiesPopular.map(city => {
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
              </Slider>
            )}
          </div>
        </Fragment>
      )}
      <style jsx>{styles}</style>
      <style jsx global>
        {stylesGlobal}
      </style>
    </div>
  );
}
