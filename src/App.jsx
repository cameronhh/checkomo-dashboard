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
  Layer,
  Grommet,
  ResponsiveContext,
} from "grommet";

import { FormClose, Map, Menu } from "grommet-icons";

import {
  routes,
  sidebar,
  theme,
} from "./config";

import { AppBar, Sidebar, Spinner, View } from "./components";
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
      userDetail,
      setUserDetail,
      venues,
      setVenues,
      selectedVenue,
      setSelectedVenue,
    }
  ), [userDetail,
      setUserDetail,
      venues,
      setVenues,
      selectedVenue,
      setSelectedVenue,
    ]
  );

  const [showSidebar, setShowSidebar] = useState(false);

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
                      <Button
                        icon={<Menu />}
                        onClick={() => setShowSidebar(!showSidebar)}
                      />
                    <Heading level='3' margin='small'>
                      Checkomo
              </Heading>
                  </AppBar>
                  <Box direction="row" fill>
                    {
                      loggedIn && showSidebar &&
                      (
                        size !== "small" ?
                          <Sidebar
                            appIcon={<Map color="brand" />}
                            appName="Checkomo"
                            items={sidebar}
                          />
                          :
                          <Layer>
                            <Box
                              fill
                              background='white'
                              align='center'
                              justify='center'
                            >
                              <Sidebar
                                fill
                                appIcon={<Map color="brand" />}
                                appName="Checkomo"
                                items={sidebar}
                                setShowSidebar={setShowSidebar}
                              />
                              <Button
                                icon={<FormClose />}
                                onClick={() => setShowSidebar(false)}
                              />
                            </Box>
                          </Layer>
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
