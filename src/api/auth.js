import axios from 'axios';
import jwt from 'jsonwebtoken';

export const postLogin = async (loginParams) => {
  const res = await axios.post(`${process.env.REACT_APP_API_BASE}/token`,
    loginParams);

  localStorage.setItem('token', JSON.stringify(res.data.token));
  const decodedToken = jwt.decode(res.data.token);
  localStorage.setItem('userDetail', JSON.stringify(decodedToken));

  return res.data;
}

export const postLogout = () => {
  return new Promise((resolve, reject) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetail');
    localStorage.removeItem('venues');
    resolve();
  })
}

export const handleLogout = () => {
  postLogout().then(
    () => {
      window.location.reload(false);
    }
  )
}

export const switchTheme = () => {
  if (!!localStorage.getItem('darkMode')) {
    localStorage.removeItem('darkMode');
  } else {
    localStorage.setItem('darkMode', JSON.stringify(true));
  }
  window.location.reload(false);
}

export const state = {
  logged: !!localStorage.getItem('token'),
  token: JSON.parse(localStorage.getItem('token')),
  userDetail: JSON.parse(localStorage.getItem('userDetail')),
  darkMode: !!localStorage.getItem('darkMode'),
  venues: JSON.parse(localStorage.getItem('venues')),
  hasSelectedVenue: !!localStorage.getItem('selectedVenue'),
  selectedVenue: JSON.parse(localStorage.getItem('selectedVenue')),
}