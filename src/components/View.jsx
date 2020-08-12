import React from "react";


import { Box } from "grommet";


export const View = ({ ...rest }) => {

  return (
    <Box
      align="center"
      pad={{horizontal: "small", top: "small", bottom: "large"}}
      fill
      flex
      overflow={{ vertical: "scroll", horizontal: "hidden" }}
    >
      <Box
        align="center"
        flex="grow"
        gap="medium"
        pad="medium"
        {...rest}
      />
    </Box>
  );
}

export default View;
