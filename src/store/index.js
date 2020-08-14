import jwt from 'jsonwebtoken';

export const setLocalSelectedVenue = (venue) => {
  localStorage.setItem('selectedVenue', JSON.stringify(venue));
}

export const isVenueSelected = () => {
  return !!localStorage.getItem('selectedVenue');
}

export const getLocalSelectedVenue = () => {
  return JSON.parse(localStorage.getItem('selectedVenue'));
}

export const removeLocalSelectedVenue = () => {
  localStorage.removeItem('selectedVenue');
}

export const setToken = (token) => {
  localStorage.setItem('token', JSON.stringify(token));
  const decodedToken = jwt.decode(token);
  localStorage.setItem('userDetail', JSON.stringify(decodedToken));
}

export const isTokenStored = () => {
  return !!localStorage.getItem('token');
}

export const getToken = () => {
  return JSON.parse(localStorage.getItem('token'));
}

export const getUserDetail = () => {
  return JSON.parse(localStorage.getItem('userDetail'));
}

export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userDetail');
}

export const setDarkMode = (isDarkMode) => {
  localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
}

export const isDarkMode = () => {
  return !!localStorage.getItem('darkMode')
}

export const setAuthorisedVenues = (venues) => {
  localStorage.setItem('venues', JSON.stringify(venues));
}

export const getAuthorisedVenues = () => {
  return JSON.parse(localStorage.getItem('venues'));
}

export const removeAuthorisedVenues = () => {
  localStorage.removeItem('venues');
}