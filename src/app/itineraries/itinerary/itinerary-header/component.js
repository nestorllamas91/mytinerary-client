import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '$client/app/itineraries/itinerary/itinerary-header/styles';

function ItineraryHeader({ itinerary, authorName }) {
  const { itineraryId, cityId, userId, title, duration, price, hashtags, rating } = itinerary;
  return (
    <Fragment>
      <div className="itinerary-author">
        <img
          src={`${process.env.PUBLIC_URL}/uploads/profiles/${userId}.jpg`}
          alt={`${authorName.first} ${authorName.last}`}
          className="itinerary-author-image"
        />
        <span className="itinerary-author-name">{`${authorName.first} ${authorName.last}`}</span>
      </div>
      <div className="itinerary-details">
        <span className="itinerary-title">{title}</span>
        <div className="itinerary-rating-duration-price">
          <span>{rating.toFixed(1)}/5</span>
          <span className="itinerary-duration">{duration === 1 ? '1 day' : `${duration} days`}</span>
          <span>{price}</span>
        </div>
        <div className="itinerary-hashtags">
          {hashtags.map((hashtag, index) => (
            <span key={index} className="itinerary-hashtag">
              #{hashtag}
            </span>
          ))}
        </div>
      </div>
      <style jsx>{styles}</style>
    </Fragment>
  );
}

ItineraryHeader.propTypes = {
  itinerary: PropTypes.shape({
    itineraryId: PropTypes.number.isRequired,
    cityId: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    hashtags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    rating: PropTypes.number.isRequired
  }).isRequired,
  authorName: PropTypes.shape({
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired
  }).isRequired
};

export default ItineraryHeader;
