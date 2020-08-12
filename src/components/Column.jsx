import React from "react";

import { Box } from "grommet";

export const Column = ({ ...rest }) => {
  return (
    <Box gap="large" flex="grow" margin="medium" {...rest} />
  )
}
