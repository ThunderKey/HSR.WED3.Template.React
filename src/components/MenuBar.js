import React from "react";
import {
  Link,
  withRouter,
} from "react-router-dom";
import { Menu } from 'semantic-ui-react';

const MenuBar = withRouter(({ history, location: { pathname }, user, signout }) => {
  if(user) {
    const handleSignout = event => {
      event.preventDefault();
      signout(() => history.push("/"));
    };
    const MenuLink = ({href, label}) => {
      return (
        <Menu.Item active={pathname === href}>
          <Link to={href}>{label}</Link>
        </Menu.Item>
      );
    };
    return (
      <Menu stackable>
        <Menu.Item>
          {user.firstname} {user.lastname} &ndash; {user.accountNr}
        </Menu.Item>
        <MenuLink href="/" label="Home" />
        <MenuLink href="/dashboard" label="Kontoübersicht" />
        <MenuLink href="/transactions" label="Zahlungen" />
        <Menu.Menu position='right'>
          <Menu.Item>
            <a href="/logout" onClick={handleSignout}>
              Logout {user.firstname} {user.lastname}
            </a>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
  return null;
});

export default withRouter(MenuBar);
