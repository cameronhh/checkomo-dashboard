import React from "react";

import { Box, Heading, Paragraph } from "grommet";
import { Halt } from "grommet-icons";

import {
  Column,
  Row,
  View,
} from "../components";


const NotFound = () => {
  return (
    <View>
      <Row>
        <Column>
          <Box align="center">
            <Halt size="xlarge" color={{ light: "brand", dark: "accent-1" }} />
            <Heading textAlign="center" level="2">
              Uh oh!
            </Heading>
            <Paragraph textAlign="center">
              The page you requested does not exist or has been removed.
            </Paragraph>
          </Box>
        </Column>
      </Row>
    </View>
  );
}

export default NotFound;
