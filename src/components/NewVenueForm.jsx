import React, { useContext, useState } from "react"

import {
  Box,
  Button,
  TextInput,
} from "grommet";

import { useMutation } from "react-query";

import { postCreateVenue } from "../api";

import { UserContext } from "../UserContext";

export const NewVenueForm = () => {
  const [newVenueName, setNewVenueName] = useState('');
  const [newVenueAddress, setNewVenueAddress] = useState('');

  const { setSelectedVenue } = useContext(UserContext);

  const [newVenueMutation,] = useMutation(postCreateVenue);

  return (
    <Box pad="medium" gap="medium">
      <TextInput
        name="venueName"
        placeholder="Venue Name"
        value={newVenueName}
        onChange={(event) => setNewVenueName(event.target.value)}
      />
      <TextInput
        name="venueAddress"
        placeholder="Venue Address"
        value={newVenueAddress}
        onChange={(event) => setNewVenueAddress(event.target.value)}
      />
      <Button
        primary
        label="Create Venue"
        onClick={() => {
          newVenueMutation({
            name: newVenueName,
            address: newVenueAddress,
            timezone: Intl.DateTimeFormat()
              .resolvedOptions().timeZone,
          })
            .then((res) => {
              setSelectedVenue(res);
              localStorage.setItem('selectedVenue',
                JSON.stringify(res));

            })
        }}
      />
    </Box>
  );
}
