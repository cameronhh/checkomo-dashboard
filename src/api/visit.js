import axios from 'axios';
import moment from 'moment';
import { state } from './auth'

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
})

const parseManualCheckInDatetime = (date, time) => {
  let nonIsoDate = date.substring(0, 10);

  let hours = parseInt(time.split(':')[0])
  let minutes = parseInt(time.split(':')[1].split(' ')[0])
  const isPm = time.split(':')[1].split(' ')[1] === 'pm'
  hours = isPm ? hours + 12 : hours;

  let resDate = moment(nonIsoDate)

  resDate.add(hours, 'hours').add(minutes, 'minutes')

  return resDate.utc().format('YYYY-MM-DD HH:mm:ss');
}

export const getAllVisits = async (venueId, max = 0) => {
  const header = authHeader(state.token);

  const qs = max ? `?max_records=${max}` : '';

  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/venue/${venueId}/visit${qs}`,
    header
  );

  return res.data;
}

export const getAllVisitsInRange = async (
  venueId,
  minDateTime,
  maxDateTime
) => {
  const header = authHeader(state.token);

  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/venue/${venueId}/visit`
    + `?in_dttm_min=${minDateTime}&in_dttm_max=${maxDateTime}`,
    header);

  return res.data;
}

export const postVisit = async (mutationData) => {
  const header = authHeader(state.token);

  const venueId = mutationData.venueId;
  delete mutationData.venueId;

  const inDateTime = mutationData.customerCheckInDate ?
    parseManualCheckInDatetime(
      mutationData.customerCheckInDate,
      mutationData.customerCheckInTime
    )
    :
    moment.utc().utc().format('YYYY-MM-DD HH:mm:ss');

  const body = {
    "given_name": mutationData.customerFirstName,
    "surname": mutationData.customerSurname,
    "address": mutationData.customerAddress,
    "email": mutationData.customerEmail,
    "phone": mutationData.customerPhone,
    "in_dttm": inDateTime,
    "venue_code_id": mutationData.venueCodeId,
    "out_dttm": null,
    "clustered_id": null,
    "meta_info": "",
  }

  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/venue/${venueId}/visit`,
    body,
    header
  );

  return res.data;
}