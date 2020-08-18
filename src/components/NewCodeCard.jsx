import React, { useState, useContext } from 'react'

import {
  Box,
  Button,
  Form,
  FormField,
  TextInput,
  Text,
  Heading
} from "grommet";

import { Card } from '../components';

import { UserContext } from "../UserContext";


import { useMutation } from 'react-query'
import { postNewVenueCode } from '../api/venue'

export const NewCodeCard = ({ ...rest }) => {

  const { selectedVenue } = useContext(UserContext);

  const [formValue, setFormValue] = useState({
    newVenueCodeName: '',
    newVenueCode: ''
  });
  const [newCode, setNewCode] = useState(`checkin.checkomo.com/...`);

  const [newVenueCodeMutation,] = useMutation(postNewVenueCode);

  return (
    <Card>
      <Heading level="2" margin="none" size="small">
        Generate New Code
      </Heading>
      <Form
        value={formValue}
        onChange={nextValue => {
          setFormValue(nextValue);
          setNewCode(
            `checkin.checkomo.com/${selectedVenue.id}/${nextValue.newVenueCode}`
          );
        }}
        onSubmit={async (event) => {
          event.preventDefault();
          // send to db
          await newVenueCodeMutation({
            venueId: selectedVenue.id,
            name: formValue.newVenueCodeName,
            code: formValue.newVenueCode
          });
          // redirect to new page with QR Code
          setFormValue({ newVenueCodeName: '', newVenueCode: '' });
          window.location.reload(false);
        }}
      >
        <Box gap="medium">
          <FormField name="newVenueCodeName" label="Label">
            <TextInput name="newVenueCodeName" type="text" />
          </FormField>
          <FormField required name="newVenueCode" label="New Code">
            <TextInput name="newVenueCode" type="text" />
          </FormField>
          <Box justify="center" direction="row" wrap>
            <Text size="small"><i>{newCode}</i></Text>
          </Box>
          <Button
            primary
            type="submit"
            label="Generate"
          />
        </Box>
      </Form>
    </Card>
  )
}
