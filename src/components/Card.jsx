import React, { useContext } from 'react';

import { Box, ResponsiveContext } from 'grommet';

export const Card = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);

  return (
    <Box
      round
      pad="large"
      elevation="small"
      direction="column"
      background={{ light: 'white', dark: 'black' }}
      gap="medium"
      width={size !== 'small' && size !== 'medium' ? size : ''}
      {...rest}
    />
  );
};
