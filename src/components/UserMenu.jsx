import React from "react";

import { Menu } from "grommet";

import {
  UserSettings,
} from 'grommet-icons';

import {
  handleLogout,
  // switchTheme,
} from "../api"

import { removeLocalSelectedVenue } from "../store";


export const UserMenu = (props) => {

  const menuItems = [
    {
      label: "Change Venue",
      onClick: () => {
        removeLocalSelectedVenue();
        window.location.reload(false);
      }
    },
    /* {
      label: "Switch Theme",
      onClick: () => switchTheme(),
    }, */
    {
      label: "Logout",
      onClick: () => handleLogout(),
    },
  ]

  return (
    <Menu
      dropProps={{ align: { top: 'bottom', right: 'right' } }}
      dropBackground={{ light: 'white', dark: 'black' }}
      icon={<UserSettings />}
      items={menuItems}
      {...props}
    />
  );
}
