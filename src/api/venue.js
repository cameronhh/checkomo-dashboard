import axios from 'axios';
import moment from 'moment';
import { state } from './auth';

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
})

export const postCreateVenue = async (mutationData) => {
  const header = authHeader(state.token);

  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/venue`,
    mutationData,
    header
  );

  return res.data;
}

export const getAllVenues = async () => {
  const header = authHeader(state.token);

  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/user/${state.userDetail.user_id}/venue`,
    header
  );

  localStorage.setItem('venues', JSON.stringify(res.data));

  return res.data;
}

export const getAllVenuesByUserId = async (userId) => {
  const header = authHeader(state.token);

  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/user/${userId}/venue`,
    header
  );

  return res.data[0];
}

export const getAllVenueCodes = async (venueId) => {
  const header = authHeader(state.token);

  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/venue/${venueId}/venuecode`,
    header
  );

  return res.data;
}

export const postNewVenueCode = async (mutationData) => {
  const header = authHeader(state.token);

  const venueId = mutationData.venueId;
  delete mutationData.venueId;

  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/venue/${venueId}/venuecode`,
    mutationData,
    header
  );

  return res.data;
}

export const disableVenueCode = async (mutationData) => {
  const header = authHeader(state.token);

  mutationData.end_dttm = moment.utc().format('YYYY-MM-DD HH:mm:ss')

  const res = await axios.put(
    `${process.env.REACT_APP_API_BASE}/venuecode/${mutationData.id}`,
    mutationData,
    header
  );

  return res.data;
}

