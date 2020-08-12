import React from "react";

import {
  Column,
  RecentCheckInsCard,
  Row,
  View
} from "../components";


const Dashboard = () => {
  return (
    <View>
      <Row>
        <Column>
          <RecentCheckInsCard />
        </Column>
      </Row>
    </View>
  );
}

export default Dashboard;
