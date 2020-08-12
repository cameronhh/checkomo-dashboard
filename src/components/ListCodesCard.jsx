import React, { useContext } from 'react'

import {
  Box,
  Button,
  Table,
  TableCell,
  TableBody,
  TableRow,
  Text,
  Heading
} from "grommet";

import {
  Close,
  DocumentPdf,
} from "grommet-icons"

import { getAllVenueCodes } from '../api'
import { useQuery } from 'react-query'

import moment from 'moment';

import { Card } from '../components'

import { disableVenueCode } from '../api';

import { UserContext } from "../UserContext";

const venueCodeDeletePrompt = 'Are you sure you want to delete this venue '
  + 'code? Customers will no longer be able to check-in using this link.'

const isActiveCode = (endDateTime) => {
  if (!endDateTime) return true;
  if (moment.utc(endDateTime).isBefore(moment.utc())) {
    return false
  }
}

export const ListCodesCard = ({ ...rest }) => {

  const { selectedVenue } = useContext(UserContext);

  const venueCodesQuery = useQuery(
    [selectedVenue.id],
    getAllVenueCodes,
    { enabled: selectedVenue.id }
  );

  return (
    <Card>
      <Heading level="2" margin="none" size="small">
        {`${selectedVenue.name} Active Venue Codes`}
      </Heading>
      {venueCodesQuery.data && !venueCodesQuery.data.length ?
        <Box align="center"><Text><i>No Active Venue Codes</i></Text></Box>
        :
        <Table>
          <TableBody margin="small">
            {
              venueCodesQuery.status === 'success' ?
                venueCodesQuery.data.map((datum, index) => (
                  isActiveCode(datum.end_dttm) ?
                    <TableRow key={index}>
                      <TableCell scope="row">
                        <strong>{datum.name}</strong>
                      </TableCell>
                      <TableCell>{datum.code}</TableCell>
                      <TableCell size="xsmall">
                        <Box gap="small" direction="row">
                          <Button
                            alignSelf="center"
                            plain
                            href={`/qr/generate/${datum.venue_id}/${datum.code}`}
                            target='_blank'
                            hoverIndicator
                            icon={<DocumentPdf />}
                          />
                          <Button
                            alignSelf="center"
                            plain
                            onClick={async () => {
                              const conf = window.confirm(venueCodeDeletePrompt);
                              if (conf === true) {
                                await disableVenueCode({ ...datum })
                              }
                            }
                            }
                            hoverIndicator
                            icon={<Close />}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                    :
                    null
                ))
                :
                null
            }
          </TableBody>
        </Table>
      }
    </Card>
  )
}
