import React, { useState, useContext } from 'react';
import moment from 'moment';

import { Box, DataTable, Heading, Menu, ResponsiveContext, Text } from 'grommet';

import { Card } from '../components';

import { useQuery } from 'react-query';

import { UserContext } from '../UserContext';

import { getAllVisits } from '../api';

const columns = [
  {
    property: 'surname',
    size: 'xsmall',
    search: true,
    header: <Text>Last Name</Text>,
    render: (datum) => <strong>{datum.surname}</strong>,
  },
  {
    property: 'given_name',
    size: 'xsmall',
    header: <Text>First Name</Text>,
  },
  {
    property: 'in_dttm',
    size: 'xsmall',
    header: 'Time In',
    render: (datum) => datum.in_dttm && moment.utc(datum.in_dttm).local().format('h:mma'),
  },
  {
    property: 'dateIn',
    size: 'xsmall',
    header: 'Date',
    render: (datum) => {
      if (datum.in_dttm) {
        const date = moment.utc(datum.in_dttm).local();
        return date.format('DD/MM/YYYY');
      }
    },
  },
];

const columnsMobile = [
  {
    property: 'surname',
    search: true,
    header: <Text>Last Name</Text>,
    render: (datum) => <strong>{datum.surname}</strong>,
  },
  {
    property: 'in_dttm',
    header: 'Time In',
    render: (datum) => datum.in_dttm && moment.utc(datum.in_dttm).local().format('h:mma'),
  },
];

export const RecentCheckInsCard = ({ ...rest }) => {
  const { selectedVenue } = useContext(UserContext);

  const [maxResults, setMaxResults] = useState('25');

  const allVisitsQuery = useQuery([selectedVenue.id, maxResults], getAllVisits, {
    enabled: selectedVenue.id && maxResults,
    refetchInterval: 15000,
  });

  const size = useContext(ResponsiveContext);

  return (
    <Card width={size !== 'small' && size !== 'medium' ? size : ''}>
      <Box direction="row" justify="between" gap="small">
        <Heading level="2" margin="none" size="small">
          Recent Check-Ins
        </Heading>
        <Menu
          dropProps={{
            align: { top: 'bottom', left: 'left' },
          }}
          size="medium"
          label={maxResults}
          items={[
            { label: '25', onClick: () => setMaxResults('25') },
            { label: '50', onClick: () => setMaxResults('50') },
            { label: '75', onClick: () => setMaxResults('75') },
            { label: '100', onClick: () => setMaxResults('100') },
          ]}
        />
      </Box>
      <Box>
        {allVisitsQuery.data && !allVisitsQuery.data.length ? (
          <Box align="center">
            <Text>
              <i>No Check-Ins</i>
            </Text>
          </Box>
        ) : allVisitsQuery.status === 'success' ? (
          <DataTable
            primaryKey={false}
            columns={size === 'small' ? columnsMobile : columns}
            pad="xsmall"
            sort={{
              direction: 'desc',
              property: 'in_dttm',
            }}
            resizable={true}
            onClickRow={() => {}}
            data={allVisitsQuery.data.map((d) => ({
              ...d,
              dateIn: d.in_dttm,
            }))}
            step={30}
          />
        ) : null}
      </Box>
    </Card>
  );
};
