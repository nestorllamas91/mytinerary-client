import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles, {
  stylesGlobal,
  stylesMaterialUi,
  themeMaterialUi
} from '$client/app/itineraries/itinerary/itinerary-body/styles';

import { useSelector, useDispatch } from 'react-redux';
import { readDataActivitiesSection } from '$client/app/itineraries/itinerary/itinerary-body/activities/slice';
import { ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';

import Activity from '$client/app/itineraries/itinerary/itinerary-body/activities/activity/component';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slider from 'react-slick';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';

function ItineraryBody({ itineraryId }) {
  const { activitiesSectionIsLoading, activitiesSectionData, activitiesSectionError } = useSelector(
    ({ activitiesSection }) => activitiesSection
  );
  const activities = activitiesSectionData ? activitiesSectionData.output.data : [];
  const { userData } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [comments, setComments] = useState([]);
  const classes = stylesMaterialUi();

  useEffect(() => {
    dispatch(readDataActivitiesSection(itineraryId));
  }, []);

  useEffect(() => {
    async function getComments() {
      try {
        const myComments = await axios.get(`/api/comments/${itineraryId}`);
        setComments(myComments.data.readComments);
      } catch (err) {
        console.log(err);
      }
    }
    getComments();
  }, [messageSent]);

  function handleComment(e) {
    setComment(e.target.value);
  }

  async function handleSendComment() {
    try {
      const myComment = {
        itineraryId: itineraryId,
        userId: userData.userId,
        message: comment
      };
      await axios.post('/api/comments', myComment);
      setMessageSent(prevMessageSent => !prevMessageSent);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      {activitiesSectionIsLoading ? (
        <LinearProgress />
      ) : (
        <Fragment>
          {activitiesSectionError ? (
            <span className="alert alert-error">
              Error: {activitiesSectionError.status.code} {activitiesSectionError.status.name}
            </span>
          ) : activities.length === 0 ? (
            <span className="alert alert-info">No activity has been found.</span>
          ) : (
            <Fragment>
              <div className="activities-section">
                <h3>Activities</h3>
                <hr />
                <Slider autoplay={false} rows={1} slidesToShow={1} slidesToScroll={1} dots={true}>
                  {activities.map(activity => (
                    <Activity key={activity.activityId} {...activity} />
                  ))}
                </Slider>
              </div>
              <div className="comments-section">
                <h3>Comments</h3>
                <hr />
                <ThemeProvider theme={themeMaterialUi}>
                  <div className="comment">
                    <TextField
                      id="new-comment"
                      label="Write a comment..."
                      multiline
                      rows={3}
                      variant="outlined"
                      value={comment}
                      onChange={handleComment}
                      classes={{ root: classes.commentField }}
                    />
                    <SendIcon onClick={handleSendComment} />
                  </div>
                  {comments
                    ? comments.map(comment => (
                        <div key={comment.commentId} style={{ border: '1px solid black', margin: '5px' }}>
                          <span>{comment.message}</span>
                        </div>
                      ))
                    : null}
                </ThemeProvider>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
      <style jsx>{styles}</style>
      <style jsx global>
        {stylesGlobal}
      </style>
    </Fragment>
  );
}

ItineraryBody.propTypes = {
  itineraryId: PropTypes.number.isRequired
};

export default ItineraryBody;
