import React, { useState } from 'react';

import { Heading, Form, FormField, Text, TextInput, Box, Button } from 'grommet';

import { Card } from '../components';

import { postSignUp } from '../api';

import { useMutation } from 'react-query';

export const SignUpForm = () => {
  const [signUpFormValue, setSignUpFormValue] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [signUpMutation] = useMutation(postSignUp);

  const passwordMismatch =
    signUpFormValue.password &&
    signUpFormValue.passwordConfirm &&
    signUpFormValue.password !== signUpFormValue.passwordConfirm
      ? "Passwords don't match"
      : undefined;

  return (
    <Card>
      <Heading level="2" textAlign="center" margin="none" size="small">
        Checkomo Signup
      </Heading>
      <Form
        value={signUpFormValue}
        onChange={(nextValue) => setSignUpFormValue(nextValue)}
        onSubmit={(event) => {
          console.log(signUpFormValue);
          signUpMutation(signUpFormValue);
        }}
      >
        <FormField required name="email" label="Email">
          <TextInput type="email" name="email" />
        </FormField>
        <FormField required type="password" name="password" label="Password">
          <TextInput name="password" type="password" />
        </FormField>
        <FormField required name="passwordConfirm" type="password" label="Confirm Password">
          <TextInput name="passwordConfirm" type="password" />
        </FormField>
        {passwordMismatch && (
          <Box pad={{ horizontal: 'small' }}>
            <Text color="status-error">{passwordMismatch}</Text>
          </Box>
        )}
        <Box pad={{ top: 'small' }} gap="small">
          <Button active={!!passwordMismatch} primary type="submit" label="Create Account" />
        </Box>
      </Form>
    </Card>
  );
};
