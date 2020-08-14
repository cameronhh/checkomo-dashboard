import React, { useState} from 'react'

import {
  Box,
  CheckBox,
  Heading,
} from "grommet";

import { Card } from '../components'

const SimpleCheckBox = ({ checked: checkedProp, ...rest }) => {
  const [checked, setChecked] = useState(!!checkedProp);
  const onChange = event => setChecked(event.target.checked);

  return (
    <CheckBox {...rest} checked={checked} onChange={onChange} />
  );
}


export const SettingsCard = ({ name, count, ...rest }) => {

  return (
    <Card>
      <Heading level="2" margin="none" size="small">
        Settings
      </Heading>
      <Box>
        <SimpleCheckBox label="Dark Mode" toggle reverse />
      </Box>
    </Card>
  )
}
