import React from "react";

import { Box } from "grommet";

export const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='start'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    gap="small"
    style={{ zIndex: '1' }}
    {...props}
  />
);
