import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles, { stylesMaterialUi } from '$client/app/_shared/nav-bar-bottom/styles';

import { useLocation, useHistory, Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';

export default function NavBarBottom() {
  const { pathname } = useLocation();
  const { goBack } = useHistory();

  return pathname === '/' ? null : <BottomNavBarChildMemoized goBack={goBack} />;
}

const BottomNavBarChildMemoized = memo(BottomNavBarChild);

function BottomNavBarChild({ goBack }) {
  const classes = stylesMaterialUi();

  function handleGoBack() {
    goBack();
  }

  return (
    <footer className="bottom-nav-bar-container">
      <nav>
        <IconButton onClick={handleGoBack} classes={{ root: classes.goBackIconButton }}>
          <ArrowBackIcon classes={{ root: classes.icon }} />
        </IconButton>
        <Link to="/">
          <IconButton classes={{ root: classes.homeIconButton }}>
            <HomeIcon classes={{ root: classes.icon }} />
          </IconButton>
        </Link>
      </nav>
      <style jsx>{styles}</style>
    </footer>
  );
}

BottomNavBarChild.propTypes = {
  goBack: PropTypes.func.isRequired
};
