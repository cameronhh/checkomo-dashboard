import { deepMerge } from 'grommet/utils';
import { grommet } from "grommet"

export const theme = deepMerge(grommet, {
  global: {
    size: {
      avatar: "36px",
      sidebar: "60px"
    },
    colors: {
      brand: '#3D138D',
      "neutral-2": '#7D4CDB',
    },
    // colors: {
    //   brand: '#7D4CDB',
    //   "neutral-2": '#3D138D',
    // },
  },
  formField: {
    error: {
      size: 'xsmall',
    },
    help: {
      size: 'xsmall',
    },
    info: {
      size: 'xsmall',
    },
    label: {
      size: 'small',
    },
  },
});
