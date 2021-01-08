import React, { Fragment, useContext, useEffect, useState } from 'react';

import { UserContext } from '../UserContext';

import { Box, Button, Heading } from 'grommet';

import { Card, NewVenueForm, Overlay, SelectVenueForm } from '../components';

import { useQuery } from 'react-query';

import { getAllVenues } from '../api';

export const VenuePrompt = () => {
  const [creatingNewVenue, setCreatingNewVenue] = useState(false);

  const { venues, setVenues, selectedVenue } = useContext(UserContext);

  const venuesQuery = useQuery('venues', getAllVenues, {
    enabled: !selectedVenue,
  });

  useEffect(() => {
    setVenues(venuesQuery.data);
  }, [setVenues, venuesQuery.data]);

  return (
    <Overlay>
      <Card>
        {venues &&
          (!venues.length || creatingNewVenue ? (
            <Fragment>
              <Heading textAlign="center" level="2" size="small">
                Create New Venue
              </Heading>
              <NewVenueForm />
              <Box pad={{ horizontal: 'medium', bottom: 'medium' }}>
                {venues.length ? (
                  <Button
                    label="Cancel"
                    onClick={() => {
                      setCreatingNewVenue(false);
                    }}
                  />
                ) : null}
              </Box>
            </Fragment>
          ) : (
            <Fragment>
              <Heading textAlign="center" level="2" size="small">
                Select Venue
              </Heading>
              <SelectVenueForm venues={venues} />
              <Box pad={{ horizontal: 'medium', bottom: 'medium' }}>
                <Button
                  label="New Venue"
                  onClick={() => {
                    setCreatingNewVenue(true);
                  }}
                />
              </Box>
            </Fragment>
          ))}
      </Card>
    </Overlay>
  );
};
