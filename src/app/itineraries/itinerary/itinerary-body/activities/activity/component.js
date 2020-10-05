import React from 'react';
import PropTypes from 'prop-types';
import styles from '$client/app/itineraries/itinerary/itinerary-body/activities/activity/styles';

import * as images_activities from '$client/app/itineraries/itinerary/itinerary-body/activities/images';

function Activity({ activityId, itineraryId, cityId, title, description }) {
  return (
    <div className="activity-container">
      <div className="activity-image-title">
        <img src={images_activities[`image_activity${activityId}`]} alt={title} className="activity-image" />
        <span className="activity-title">{title}</span>
      </div>
      <p className="activity-description">{description}</p>
      <style jsx>{styles}</style>
    </div>
  );
}

Activity.propTypes = {
  activityId: PropTypes.number.isRequired,
  itineraryId: PropTypes.number.isRequired,
  cityId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Activity;
