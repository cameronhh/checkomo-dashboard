import React from "react";

import { Box } from "grommet";


export const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'medium', vertical: 'small' }}
    gap="small"
    style={{ zIndex: '1' }}
    elevation="small"
    {...props}
  />
);
