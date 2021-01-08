import axios from 'axios';

import {
  getAuthorisedVenues,
  getLocalSelectedVenue,
  getToken,
  getUserDetail,
  isDarkMode,
  isTokenStored,
  isVenueSelected,
  removeAuthorisedVenues,
  removeToken,
  setDarkMode,
  setToken,
} from '../store';

export const postLogin = async (loginParams) => {
  const res = await axios.post(`${process.env.REACT_APP_API_BASE}/token`, loginParams);

  setToken(res.data.token);

  return res.data;
};

export const postLogout = () => {
  return new Promise((resolve, reject) => {
    removeToken();
    removeAuthorisedVenues();
    resolve();
  });
};

export const handleLogout = () => {
  postLogout().then(() => {
    window.location.reload(false);
  });
};

export const switchTheme = () => {
  if (isDarkMode()) {
    setDarkMode(false);
  } else {
    setDarkMode(true);
  }
  window.location.reload(false);
};

export const state = {
  logged: isTokenStored(),
  token: getToken(),
  userDetail: getUserDetail(),
  darkMode: isDarkMode(),
  venues: getAuthorisedVenues(),
  hasSelectedVenue: isVenueSelected(),
  selectedVenue: getLocalSelectedVenue(),
};
