import React from "react";

import {
  Column,
  ListCodesCard,
  NewCodeCard,
  Row,
  View,
} from '../components';


const QRCodes = () => {
  return (
    <View>
      <Row>
        <Column>
          <NewCodeCard />
        </Column>
        <Column>
          <ListCodesCard />
        </Column>
      </Row>
    </View>
  );
}

export default QRCodes;
