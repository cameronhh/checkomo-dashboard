import React from 'react'

import { Box, Text, Heading } from "grommet";

export const ResponsiveCard = ({ name, count, ...rest }) => {
  return (
    <Box round pad="medium" direction="column" background="white" {...rest}>
      <Heading level="2" margin="none" size="small">
        {name}
      </Heading>
      <Text size="90px" weight="bold">
        {count}
      </Text>
      <Box gap="medium" pad={{ vertical: "small" }}>
        <Box direction="row" align="center">
          <Box pad="xsmall">
            <Text
              size="small"
              color={{ light: "dark-1", dark: "light-1" }}
              margin={{ left: "xsmall" }}
            >
              Helloooo
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
