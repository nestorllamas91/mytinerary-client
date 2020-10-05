import React, { Fragment, useState, useEffect } from 'react';
import styles from '$client/app/itineraries/styles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { readDataItinerariesPage } from '$client/app/itineraries/slice';

import City from '$client/app/cities/city/component';
import Itinerary from '$client/app/itineraries/itinerary/component';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function ItinerariesPage() {
  const { cityId } = useParams();
  const { itinerariesPageIsLoading, itinerariesPageData, itinerariesPageError } = useSelector(
    ({ itinerariesPage }) => itinerariesPage
  );
  const city = itinerariesPageData ? itinerariesPageData.city.output.data : null;
  const country = itinerariesPageData ? itinerariesPageData.country.output.data : null;
  const itineraries = itinerariesPageData ? itinerariesPageData.itineraries.output.data : [];
  const users = itinerariesPageData ? itinerariesPageData.users.output.data : [];
  const dispatch = useDispatch();
  const [expandedPanel, setExpandedPanel] = useState(0);

  useEffect(() => {
    dispatch(readDataItinerariesPage(cityId));
  }, []);

  function changeExpandedPanel(isPanelExpanded, itineraryId) {
    setExpandedPanel(isPanelExpanded ? itineraryId : -1);
  }

  if (
    !itinerariesPageIsLoading &&
    (!itinerariesPageData || (itinerariesPageData && itinerariesPageData.city.output.data.cityId !== Number(cityId))) &&
    !itinerariesPageError
  ) {
    return null;
  }

  return (
    <div className="main-container">
      {itinerariesPageIsLoading ? (
        <LinearProgress />
      ) : (
        <Fragment>
          {itinerariesPageError ? (
            <span className="alert alert-error">
              Error: {itinerariesPageError.status.code} {itinerariesPageError.status.name}
            </span>
          ) : itineraries.length === 0 ? (
            <Fragment>
              <span className="alert alert-info">No itinerary has been found.</span>
            </Fragment>
          ) : (
            <Fragment>
              <City
                key={city.cityId}
                cityId={city.cityId}
                cityName={city.name}
                countryId={country.countryId}
                countryShortName={country.shortName}
                isLink={false}
              />
              <span className="alert alert-success">{itineraries.length} itineraries have been found.</span>
              <div className="itineraries-list-container">
                {itineraries.map(itinerary => {
                  const author = users.find(user => user.userId === itinerary.userId);
                  return (
                    <Itinerary
                      key={itinerary.itineraryId}
                      itinerary={itinerary}
                      authorName={author.name}
                      expandedPanel={expandedPanel}
                      changeExpandedPanel={changeExpandedPanel}
                    />
                  );
                })}
              </div>
            </Fragment>
          )}
          <div className="return-to-cities">
            <Link to="/cities">Choose another city...</Link>
          </div>
        </Fragment>
      )}
      <style jsx>{styles}</style>
    </div>
  );
}
