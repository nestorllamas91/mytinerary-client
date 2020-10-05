import React from 'react';
import styles, { stylesMaterialUi } from '$client/app/_shared/nav-bar-top/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuPages from '$client/app/_shared/nav-bar-top/menu-pages/component';
import MenuUser from '$client/app/_shared/nav-bar-top/menu-user/component';

export default function NavBarTop() {
  const classes = stylesMaterialUi();

  return (
    <AppBar>
      <nav>
        <Toolbar classes={{ root: classes.navBarTop }}>
          <MenuPages />
          <h2>MYtinerary</h2>
          <MenuUser />
        </Toolbar>
      </nav>
      <style jsx>{styles}</style>
    </AppBar>
  );
}
