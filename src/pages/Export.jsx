import React from "react";

import {
  Column,
  ExportsCard,
  Row,
  View,
} from "../components";


const Export = () => {
  document.title = "Export | Checkomo";
  return (
    <View>
      <Row>
        <Column>
          <ExportsCard />
        </Column>
      </Row>
    </View>
  );
}

export default Export;
