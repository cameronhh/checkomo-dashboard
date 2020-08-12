import { deepMerge } from 'grommet/utils';
import { grommet } from "grommet"

export const theme = deepMerge(grommet, {
  global: {
    size: {
      avatar: "36px",
      sidebar: "60px"
    }
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
