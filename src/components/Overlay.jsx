import React from 'react'

import {
  Layer,
} from "grommet";

export const Overlay = ({ ...rest }) => {
  return (
    <Layer
      position="center"
      onClickOutside={() => { }}
      onEsc={() => { }}
      {...rest}
    />
  );
}
