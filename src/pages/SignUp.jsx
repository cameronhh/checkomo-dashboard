import React from 'react';

import { Column, Row, View, SignUpForm } from '../components';

const SignUp = (props) => {
  return (
    <View>
      <Row>
        <Column>
          <SignUpForm />
        </Column>
      </Row>
    </View>
  );
};

export default SignUp;
