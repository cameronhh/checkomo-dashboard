import React, { useContext, useState } from "react"

import {
  Box,
  Button,
  Select,
} from "grommet";


import { setLocalSelectedVenue } from "../store";

import { UserContext } from "../UserContext";


export const SelectVenueForm = ({ venues }) => {
  const {
    setSelectedVenue
  } = useContext(UserContext);

  const [venueSelect, setVenueSelect] = useState('');

  return (
    <Box pad="medium" gap="medium">
      <Select
        options={venues.map((v) => v.name)}
        placeholder="Select a venue"
        value={venueSelect}
        onChange={({ option }) => setVenueSelect(option)}
      />
      <Button
        primary
        label="Set"
        onClick={() => {
          const selected =
            (venues.filter((v) => (v.name === venueSelect)))[0];
          setSelectedVenue(selected);
          setLocalSelectedVenue(selected);
          window.location.reload(false);
        }}
      />
    </Box>
  );
}
