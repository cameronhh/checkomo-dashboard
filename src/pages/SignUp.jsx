import React, { useState } from 'react';

import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Text,
  TextInput,
} from "grommet";

import {
  Card,
  Column,
  Row,
  View,
  SignUpForm
} from "../components";


const SignUp = (props) => {
  return (
    <View>
      <Row>
        <Column>
          <SignUpForm />
        </Column>
      </Row>
    </View>
  )
};

export default SignUp;