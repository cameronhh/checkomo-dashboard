import React, { useState, useContext } from 'react'

import {
  Box,
  Button,
  DateInput,
  Form,
  FormField,
  MaskedInput,
  TextInput,
  Heading
} from "grommet";

import { Card } from '../components'

import { postVisit } from '../api'
import { useMutation } from 'react-query';


import { UserContext } from "../UserContext";

export const ManualCheckInCard = ({ name, count, ...rest }) => {
  const { selectedVenue } = useContext(UserContext);

  const [formValue, setFormValue] = useState({
    customerFirstName: '',
    customerSurname: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
    customerCheckInDate: (new Date()).toISOString(),
    customerCheckInTime: '',
  });

  const [newVisitMutation,] = useMutation(postVisit);

  return (
    <Card>
      <Heading level="2" margin="none" size="small">
        Manually Check-In Customer
      </Heading>
      <Box>
        <Form
          value={formValue}
          onChange={nextValue => {
            setFormValue(nextValue)
          }}
          validate="submit"
          onReset={() => setFormValue({
            customerFirstName: '',
            customerSurname: '',
            customerPhone: '',
            customerEmail: '',
            customerAddress: '',
            customerCheckInDate: '',
            customerCheckInTime: '',
          })}
          onSubmit={async (event) => {
            event.preventDefault()
            // send to db
            newVisitMutation({ ...formValue, venueId: selectedVenue.id });

            setFormValue({
              customerFirstName: '',
              customerSurname: '',
              customerPhone: '',
              customerEmail: '',
              customerAddress: '',
              customerCheckInDate: '',
              customerCheckInTime: '',
            })
            // display result on screen somewhere
          }}
        >
          <Box>
            <FormField
              required={true}
              name="customerFirstName"
              label="First Name"
            >
              <TextInput name="customerFirstName" type="text" />
            </FormField>
            <FormField
              required={true}
              name="customerSurname"
              label="Last Name"
            >
              <TextInput name="customerSurname" type="text" />
            </FormField>
            <FormField
              required={true}
              name="customerPhone"
              label="Phone"
            >
              <TextInput name="customerPhone" type="text" />
            </FormField>
            <FormField
              name="customerEmail"
              label="Email"
            >
              <TextInput name="customerEmail" type="text" />
            </FormField>
            <FormField
              name="customerAddress"
              label="Address"
            >
              <TextInput name="customerAddress" type="text" />
            </FormField>
            <FormField
              required={true}
              name="customerCheckInDate"
              label="Date"
            >
              <DateInput
                name="customerCheckInDate"
                format="dd/mm/yyyy"
                value={formValue.customerCheckInDate}
              />
            </FormField>
            <FormField
              required={true}
              name="customerCheckInTime"
              label="Time"
            >
              <MaskedInput
                mask={[
                  {
                    length: [1, 2],
                    options: ['1', '2', '3', '4', '5', '6',
                      '7', '8', '9', '10', '11', '12',],
                    regexp: /^1[1-2]$|^[0-9]$/,
                    placeholder: 'hh',
                  },
                  { fixed: ':' },
                  {
                    length: 2,
                    options: ['00', '15', '30', '45'],
                    regexp: /^[0-5][0-9]$|^[0-9]$/,
                    placeholder: 'mm',
                  },
                  { fixed: ' ' },
                  {
                    length: 2,
                    options: ['am', 'pm'],
                    regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
                    placeholder: 'ap',
                  },
                ]}
                name="customerCheckInTime"
              />
            </FormField>
          </Box>
          <Box pad={{top: "medium"}} justify="center" direction="row" gap="medium">
            <Button
              primary
              type="submit"
              label="Check-In"
            />
          </Box>
        </Form>
      </Box>
    </Card>
  )
}
