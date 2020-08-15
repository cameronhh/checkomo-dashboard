import React, { useState, useMemo, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import {
  Box,
  Heading,
  Button,
  Grommet,
  ResponsiveContext,
} from "grommet";

import { Map, Menu } from "grommet-icons";

import {
  routes,
  sidebar,
  theme,
} from "./config";

import { AppBar, Sidebar, Spinner, UserMenu } from "./components";
import { PrivateRoute } from './router/PrivateRoute';
import { GuestRoute } from './router/GuestRoute';

import { UserContext } from './UserContext';

import { importPage } from './util';
import { state } from './api/auth'


export const App = () => {
  const [userDetail, setUserDetail] = useState(state.userDetail);
  const [venues, setVenues] = useState(state.venues);
  const [loggedIn, setLoggedIn] = useState(state.logged);
  const [selectedVenue, setSelectedVenue] = useState(state.selectedVenue);

  const value = useMemo(() => (
    {
      loggedIn,
      setLoggedIn,
      userDetail,
      setUserDetail,
      venues,
      setVenues,
      selectedVenue,
      setSelectedVenue,
    }
  ), [
      loggedIn,
      setLoggedIn,
      userDetail,
      setUserDetail,
      venues,
      setVenues,
      selectedVenue,
      setSelectedVenue,
    ]
  );

  const [showSidebar, setShowSidebar] = useState(window.innerWidth <= 768 ? false : true);

  return (
    <UserContext.Provider value={value}>
      <Router>
        <Grommet
          theme={theme}
          full
          themeMode={state.darkMode ? "dark" : "light"}
        >
          <ResponsiveContext.Consumer>
            {size =>
              (
                <Box fill>
                  <AppBar>
                    <Box direction="row" align="center">
                      {
                        loggedIn &&
                          size === "small" ?
                          <Button
                            icon={
                              <Menu
                                color={showSidebar ? "accent-1" : "white"}
                              />
                            }
                            focusIndicator={false}
                            onClick={() => setShowSidebar(!showSidebar)}
                          />
                          :
                          <Heading level='3' margin='small'>Checkomo{selectedVenue && ` - ${selectedVenue.name}`}</Heading>
                      }
                    </Box>
                    {size === "small" && <Box direction="row" align="center">
                      <Heading level='3' margin='small'>{selectedVenue && `${selectedVenue.name}`}</Heading>
                    </Box>}
                    <Box direction="row" align="center">
                      {loggedIn && <UserMenu />}
                    </Box>
                  </AppBar>
                  <Box direction="row" fill>
                    {
                      (loggedIn) &&
                      (
                        <Sidebar
                          fill={size === "small"}
                          appIcon={<Map color="brand" />}
                          appName="Checkomo"
                          items={sidebar}
                          setShowSidebar={
                            size === "small" ? setShowSidebar : null
                          }
                          visible={showSidebar}
                        />
                      )
                    }
                    <Box flex background="light-2">
                      <Suspense fallback={<Spinner />}>
                        <Switch>
                          {routes.map((route, index) => {
                            if (route.enabled) {
                              if (route.private) {
                                return (
                                  <PrivateRoute
                                    exact
                                    key={index}
                                    path={route.path}
                                    component={importPage(route.component)}
                                  />
                                )
                              } else if (route.guest) {
                                return (
                                  <GuestRoute
                                    exact
                                    key={index}
                                    path={route.path}
                                    component={importPage(route.component)}
                                  />
                                )
                              } else { // public route
                                return (
                                  <Route
                                    key={index}
                                    component={importPage(route.component)}
                                  />
                                )
                              }
                            } else {
                              return null
                            }
                          })}
                        </Switch>
                      </Suspense>
                    </Box>
                  </Box>
                </Box>
              )}
          </ResponsiveContext.Consumer>
        </Grommet>
      </Router>
    </UserContext.Provider>
  );
}
