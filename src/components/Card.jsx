
import React from 'react';

import {
  Box,
} from "grommet";

export const Card = ({...rest}) => {
  return (
    <Box
      round
      pad="large"

      direction="column"
      background={{light: "white", dark: "black"}}
      gap="medium"
      {...rest}
    />
  )
}
