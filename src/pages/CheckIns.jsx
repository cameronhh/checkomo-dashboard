import React from 'react';

import { Column, ManualCheckInCard, Row, View } from '../components';

const CheckIns = () => {
  document.title = 'Check-In | Checkomo';
  return (
    <View>
      <Row>
        <Column>
          <ManualCheckInCard />
        </Column>
      </Row>
    </View>
  );
};

export default CheckIns;
