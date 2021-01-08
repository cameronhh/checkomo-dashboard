import React from 'react';

import { Box } from 'grommet';

export const Row = ({ ...rest }) => {
  return <Box flex={false} direction="row-responsive" wrap {...rest} />;
};
