import React from "react";

import {
  Column,
  SettingsCard,
  Row,
  View
} from "../components";


const Settings = () => {
  return (
    <View>
      <Row>
        <Column>
          <SettingsCard />
        </Column>
      </Row>
    </View>
  );
}

export default Settings;