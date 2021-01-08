import React, { useContext } from 'react';

import { Box, Button, Heading, ResponsiveContext } from 'grommet';

import { Map, Menu } from 'grommet-icons';

import { UserMenu } from '../components';

import { UserContext } from '../UserContext';

const CheckomoHomeButton = (props) => {
  return (
    <Button
      plain
      href="/"
      icon={<Map />}
      label={
        <Heading level="3" margin="small">
          Checkomo{props.extraText}
        </Heading>
      }
    />
  );
};

export const AppBar = ({ showSidebar, setShowSidebar, ...rest }) => {
  const { loggedIn, selectedVenue } = useContext(UserContext);
  const size = useContext(ResponsiveContext);

  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: 'medium', right: 'medium', vertical: 'small' }}
      gap="small"
      style={{ zIndex: '1' }}
      elevation="small"
    >
      <Box direction="row" align="center">
        {loggedIn ? (
          size === 'small' ? (
            <Button
              icon={<Menu color={showSidebar ? 'accent-1' : 'white'} />}
              focusIndicator={false}
              onClick={() => setShowSidebar(!showSidebar)}
            />
          ) : (
            <CheckomoHomeButton
              extraText={selectedVenue && loggedIn && ` - ${selectedVenue.name}`}
            />
          )
        ) : (
          size !== 'small' && <CheckomoHomeButton />
        )}
      </Box>

      <Box direction="row" align="center">
        {loggedIn
          ? size === 'small' && (
              <Heading level="3" margin="small">
                {selectedVenue && `${selectedVenue.name}`}
              </Heading>
            )
          : size === 'small' && <CheckomoHomeButton />}
      </Box>

      <Box direction="row" align="center">
        <UserMenu />
      </Box>
    </Box>
  );
};
