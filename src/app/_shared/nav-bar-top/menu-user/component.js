import React, { useState, useRef, Fragment, useEffect } from 'react';
import styles, { stylesMaterialUi } from '$client/app/_shared/nav-bar-top/menu-user/styles';

import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser } from '$client/app/_shared/user/slice';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

export default function MenuUser() {
  const { userData, userIsAuthenticated } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const [isMenuUserOpen, setIsMenuUserOpen] = useState(false);
  const anchorMenuUser = useRef(null);
  const [isRedirectToLanding, setIsRedirectToLanding] = useState(false);
  const [flagReRender, setFlagReRender] = useState(false);
  const classes = stylesMaterialUi();

  useEffect(() => {
    setFlagReRender(prevFlagReRender => !prevFlagReRender);
  }, [userData]);

  function toggleMenuUser() {
    setIsMenuUserOpen(prevIsMenuUserOpen => !prevIsMenuUserOpen);
  }

  function handleLogOut() {
    const token = window.localStorage.getItem('token');
    dispatch(logOutUser(token));
    window.localStorage.removeItem('token');
    toggleMenuUser();
    handleRedirectToHome();
  }

  function handleRedirectToHome() {
    setIsRedirectToLanding(true);
  }

  return (
    <div>
      {isRedirectToLanding ? <Redirect to="/" /> : null}
      <IconButton ref={anchorMenuUser} onClick={toggleMenuUser} classes={{ root: classes.menuIconButton }}>
        {userIsAuthenticated ? (
          <Photo userData={userData} classes={classes} />
        ) : (
          <AccountCircle classes={{ root: classes.menuIcon }} />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorMenuUser.current}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        keepMounted
        open={isMenuUserOpen}
        onClose={toggleMenuUser}
      >
        {userIsAuthenticated ? (
          <MenuItem onClick={handleLogOut} classes={{ root: classes.menuItemText }}>
            Log Out
          </MenuItem>
        ) : (
          <div>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <MenuItem onClick={toggleMenuUser} classes={{ root: classes.menuItemText }}>
                Log In
              </MenuItem>
            </Link>
            <Divider />
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <MenuItem onClick={toggleMenuUser} classes={{ root: classes.menuItemText }}>
                Sign Up
              </MenuItem>
            </Link>
          </div>
        )}
      </Menu>
      <style jsx>{styles}</style>
    </div>
  );
}

function Photo({ userData, classes }) {
  const photo = new Image();
  const photoUrl = `${process.env.PUBLIC_URL}/uploads/profiles/${userData.userId}.jpg`;
  photo.src = photoUrl;
  if (photo.width !== 0) {
    return (
      <Fragment>
        <img
          src={`${process.env.PUBLIC_URL}/uploads/profiles/${userData.userId}.jpg`}
          alt={`${userData.name.first} ${userData.name.last}`}
          className="user-image"
        />
        <style jsx>{styles}</style>
      </Fragment>
    );
  } else {
    return <AccountCircle classes={{ root: classes.menuIcon }} />;
  }
}
