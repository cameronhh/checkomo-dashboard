import React, { Fragment } from 'react';

import { Box } from 'grommet';

import { MenuButton } from './';

export const Sidebar = (props) => {
  const { appIcon, appName, items = [], accountConfig, visible, ...rest } = props;

  return (
    visible && (
      <Fragment>
        <Box fill="vertical" width="small" background={{ light: 'white', dark: 'black' }} {...rest}>
          <Box flex overflow="auto">
            {items.map(({ Icon, label, path }) => (
              <MenuButton
                setShowSidebar={props.setShowSidebar}
                Icon={Icon}
                path={path}
                label={label}
                key={label}
              />
            ))}
          </Box>
        </Box>
      </Fragment>
    )
  );
};
