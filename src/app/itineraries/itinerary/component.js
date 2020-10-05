import React from 'react';
import PropTypes from 'prop-types';
import styles, { stylesMaterialUi } from '$client/app/itineraries/itinerary/styles';

import ItineraryHeader from '$client/app/itineraries/itinerary/itinerary-header/component';
import ItineraryBody from '$client/app/itineraries/itinerary/itinerary-body/component';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Itinerary({ itinerary, authorName, expandedPanel, changeExpandedPanel }) {
  const { itineraryId } = itinerary;
  const classes = stylesMaterialUi();

  function handleChangeExpandedPanel(itineraryId) {
    return function (e, isPanelExpanded) {
      changeExpandedPanel(isPanelExpanded, itineraryId);
    };
  }

  return (
    <ExpansionPanel expanded={expandedPanel === itineraryId} onChange={handleChangeExpandedPanel(itineraryId)}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ content: classes.headerExpandedPanel }}>
        <ItineraryHeader itinerary={itinerary} authorName={authorName} />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{ root: classes.bodyExpandedPanel }}>
        {expandedPanel === itineraryId ? <ItineraryBody itineraryId={itineraryId} /> : null}
      </ExpansionPanelDetails>
      <style jsx>{styles}</style>
    </ExpansionPanel>
  );
}

Itinerary.propTypes = {
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
  }).isRequired,
  expandedPanel: PropTypes.number.isRequired,
  changeExpandedPanel: PropTypes.func.isRequired
};

export default Itinerary;
