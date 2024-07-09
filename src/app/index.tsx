import { View, Text } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link } from 'expo-router';

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(auth)/sign-in'} asChild>
        <Button text="Sign In" />
      </Link>
      <Link href={'/(auth)/sign-up'} asChild>
        <Button text="Create an Account" />
      </Link>
    </View>
  );
};

export default index;