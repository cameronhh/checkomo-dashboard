import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Text } from 'grommet';
import RoutedButton from './RoutedButton';

export const MenuButton = ({ Icon, label, path, setShowSidebar, ...rest }) => {
  let location = useLocation();

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(location.pathname === path);
  }, [location, path]);

  return (
    <RoutedButton
      setShowSidebar={setShowSidebar}
      active={active}
      hoverIndicator={{ light: 'light-2', dark: 'dark-1' }}
      path={path}
      {...rest}
    >
      <Box
        pad="medium"
        direction="row"
        gap="small"
        align="center"
        justify="start"
        background={active ? { light: 'light-2', dark: 'dark-1' } : null}
      >
        <Icon
          color={
            active ? { light: 'brand', dark: 'accent-1' } : { light: 'dark-1', dark: 'light-1' }
          }
        />
        <Text size="medium">{label}</Text>
      </Box>
    </RoutedButton>
  );
};
