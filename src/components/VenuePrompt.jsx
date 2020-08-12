import React, { useContext, useEffect, useState } from 'react'

import { UserContext } from "../UserContext";


import {
  Box,
  Button,
  Heading,
  Select,
  TextInput,
} from "grommet";

import {
  NewVenueForm,
  Overlay,
  SelectVenueForm,
} from "../components";

import { useQuery } from "react-query";

import { getAllVenues } from "../api";



export const VenuePrompt = () => {
  const [creatingNewVenue, setCreatingNewVenue] = useState(false);

  const {
    venues,
    setVenues,
    selectedVenue,
    setSelectedVenue
  } = useContext(UserContext);

  const venuesQuery = useQuery('venues', getAllVenues, {
    enabled: !selectedVenue
  });

  useEffect(() => {
    setVenues(venuesQuery.data)
  }, [setVenues, venuesQuery.data]);

  return (
    <Overlay>
      {
        venues &&
        (
          !venues.length || creatingNewVenue ?
            <Box pad="small">
              <NewVenueForm />
              <Box pad={{ horizontal: "medium", bottom: "medium" }}>
                {
                  venues.length &&
                  (
                    <Button
                      label="Cancel"
                      onClick={() => {
                        setCreatingNewVenue(false);
                      }}
                    />
                  )
                }
              </Box>
            </Box>
            :
            <Box pad="small">
              <SelectVenueForm venues={venues} />
              <Box pad={{ horizontal: "medium", bottom: "medium" }}>
                <Button
                  label="New Venue"
                  onClick={() => {
                    setCreatingNewVenue(true)
                  }}
                />
              </Box>
            </Box>
        )
      }

    </Overlay>
  )
}
