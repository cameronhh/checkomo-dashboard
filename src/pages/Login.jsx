import React, { useState } from 'react';

import { Box, Button, Form, FormField, Heading, TextInput } from 'grommet';

import { Card, Column, Row, View } from '../components';

import { postLogin } from '../api';

const Login = (props) => {
  document.title = 'Login | Checkomo';

  const [loginFormValue, setLoginFormValue] = useState({
    email: 'demo',
    password: 'password',
  });

  const handleLogin = (props, creds) => {
    postLogin(creds)
      .then(() => {
        props.history.push('/');
        window.location.reload(false);
      })
      .catch(() => alert('Login failed.'));
  };

  return (
    <View>
      <Row>
        <Column>
          <Card>
            <Heading level="2" textAlign="center" margin="none" size="small">
              Checkomo Login
            </Heading>
            <Form
              value={loginFormValue}
              onChange={(nextValue) => setLoginFormValue(nextValue)}
              onSubmit={(event) => {
                event.preventDefault();
                handleLogin(props, loginFormValue);
              }}
            >
              <FormField required name="email" label="Email">
                <TextInput name="email" />
              </FormField>
              <FormField required type="password" name="password" label="Password">
                <TextInput name="password" type="password" />
              </FormField>
              <Box pad={{ top: 'small' }} gap="small">
                <Button primary type="submit" label="Submit" />
                {/* <Button
                  label="Sign Up"
                  onClick={() => { }}
                /> */}
              </Box>
            </Form>
          </Card>
        </Column>
      </Row>
    </View>
  );
};

export default Login;
