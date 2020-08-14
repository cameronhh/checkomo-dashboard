import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Button,
  DateInput,
  Heading,
  Text,
} from "grommet";

import moment from 'moment';

import { useQuery } from 'react-query';
import { CSVLink } from "react-csv";

import { getAllVisits, getAllVisitsInRange } from '../api';


import { UserContext } from "../UserContext";

import { Card } from '../components'


const formatExportData = (data) => {
  return data.sort((a, b) => (moment(b.in_dttm) - moment(a.in_dttm)))
    .map((data) => ({
      "Date": moment.utc(data.in_dttm).local().format('DD/MM/YYYY'),
      "Time": moment.utc(data.in_dttm).local().format('HH:MM:ss'),
      "Last Name": data.surname,
      "First Name": data.given_name,
      "Phone": data.phone,
      "Email": data.email,
      "Address": data.address,
    }))
}


export const ExportsCard = ({ venueId, ...rest }) => {

  const { selectedVenue } = useContext(UserContext);
  const [dateValue, setDateValue] = useState('');

  const [dataForRangeExport, setDataForRangeExport] = useState('');
  const [dataForAllExport, setDataForAllExport] = useState('');

  const [exportRange, setExportRange] = useState({
    in_dttm_min: '',
    in_dttm_max: '',
  })

  const [rangeDownloadReady, setRangeDownloadReady] = useState(false);
  const [allDownloadReady, setAllDownloadReady] = useState(false);

  const allVisitsQuery = useQuery([selectedVenue.id], getAllVisits, {
    enabled: selectedVenue.id
  });

  const rangedVisitsQuery = useQuery(
    [selectedVenue.id, exportRange.in_dttm_min, exportRange.in_dttm_max],
    getAllVisitsInRange, {
      enabled: selectedVenue.id
        && exportRange.in_dttm_min
        && exportRange.in_dttm_max
    }
  );

  useEffect(() => {
    setRangeDownloadReady(false);
    if (rangedVisitsQuery.data && rangedVisitsQuery.data.length) {
      setDataForRangeExport(formatExportData(rangedVisitsQuery.data));
      setRangeDownloadReady(true)
    }
  }, [rangedVisitsQuery.data])

  useEffect(() => {
    setAllDownloadReady(false);
    if (allVisitsQuery.data && allVisitsQuery.data.length) {
      setDataForAllExport(formatExportData(allVisitsQuery.data));
      setAllDownloadReady(true)
    }
  }, [allVisitsQuery.data])

  return (
    <Card>
      <Heading level="2" margin="none" size="small">
        Export
      </Heading>
      <Heading level="4" margin="none" size="small">
        On Date
      </Heading>
      <DateInput
        value={dateValue}
        onChange={nextValue => {
          setRangeDownloadReady(false)
          setDateValue(nextValue.value)
          setExportRange({
            in_dttm_min: moment.utc(nextValue.value)
              .format('YYYY-MM-DD HH:mm:ss'),
            in_dttm_max: moment.utc(nextValue.value)
              .add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
          })
        }}
        name="exportDate"
        format='dd/mm/yyyy'
      />
      <Box align="center" gap="medium">
        {
          rangedVisitsQuery.data &&
          !rangedVisitsQuery.data.length &&
          <Box pad="small">
            <Text>Nothing to export on this day.</Text>
          </Box>
        }
        {
          rangeDownloadReady ?
            <CSVLink
              data={dataForRangeExport}
              filename={`CheckInExport ${moment.utc(dateValue).local()
                .format('DD-MM-YYYY')}.csv`}
              onClick={() => {
                return true;
              }}
            >
              <Button
                label="Download"
              />
            </CSVLink>
            :
            null
        }
      </Box>
      <Heading level="4" margin="none" size="small">
        All Time
      </Heading>
      <Box align="center" gap="medium">
        {
          allVisitsQuery.data &&
          !allVisitsQuery.data.length &&
          <Box pad="small">
            <Text>Nothing to export.</Text>
          </Box>
        }
        {
          allDownloadReady ?
            <CSVLink
              data={dataForAllExport}
              filename={`CheckInExport-All.csv`}
              onClick={() => {
                return true;
              }}
            >
              <Button
                primary
                label="Download All"
                onClick={(event) => { }}
              />
            </CSVLink>
            :
            null
        }
      </Box>

    </Card>
  );
}




