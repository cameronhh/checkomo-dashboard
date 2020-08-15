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
          <ListCodesCard />
        </Column>
        <Column>
          <NewCodeCard />
        </Column>
      </Row>
    </View>
  );
}

export default QRCodes;
