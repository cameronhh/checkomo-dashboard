import React, { useContext } from "react";

import { Menu } from "grommet";

import { UserContext } from "../UserContext";

import {
  SettingsOption,
} from 'grommet-icons';

import {
  handleLogout,
  switchTheme,
} from "../api"

import { removeLocalSelectedVenue } from "../store";

import { Avatar } from "./";


export const UserMenu = (props) => {
  const { setSelectedVenue } = useContext(UserContext);

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
      dropAlign={{ bottom: "top" }}
      dropBackground={{light: 'white', dark: 'black'}}
      icon={false}
      items={menuItems}
      label={
        <Avatar name='Logged in user'>
          <SettingsOption />
        </Avatar>
      }
      {...props}
    />
  );
}
