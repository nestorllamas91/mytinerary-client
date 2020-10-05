import React, { useState } from 'react';
import styles, { stylesMaterialUi } from '$client/app/_shared/nav-bar-top/menu-pages/styles';

import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ListItemText from '@material-ui/core/ListItemText';

export default function MenuPages() {
  const [isMenuOptionsOpen, setIsMenuOptionsOpen] = useState(false);
  const classes = stylesMaterialUi();

  function openMenuOptions() {
    setIsMenuOptionsOpen(true);
  }

  function closeMenuOptions() {
    setIsMenuOptionsOpen(false);
  }

  return (
    <aside>
      <IconButton onClick={openMenuOptions} classes={{ root: classes.menuIconButton }}>
        <MenuIcon classes={{ root: classes.menuIcon }} />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={isMenuOptionsOpen}
        onOpen={openMenuOptions}
        onClose={closeMenuOptions}
        classes={{ paper: classes.menu }}
      >
        <div onClick={closeMenuOptions} onKeyDown={closeMenuOptions}>
          <List>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <ListItem button>
                <ListItemIcon classes={{ root: classes.menuItemIconButton }}>
                  <HomeIcon classes={{ root: classes.menuItemIcon }} />
                </ListItemIcon>
                <ListItemText primary="Landing" classes={{ root: classes.menuItemText }} />
              </ListItem>
            </Link>
            <Link to="/cities" style={{ textDecoration: 'none' }}>
              <ListItem button>
                <ListItemIcon classes={{ root: classes.menuItemIconButton }}>
                  <LocationCityIcon classes={{ root: classes.menuItemIcon }} />
                </ListItemIcon>
                <ListItemText primary="Cities" classes={{ root: classes.menuItemText }} />
              </ListItem>
            </Link>
          </List>
        </div>
      </SwipeableDrawer>
      <style jsx>{styles}</style>
    </aside>
  );
}
