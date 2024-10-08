import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Stack } from 'expo-router';

const Index = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
        <Image
          source={require('@/src/images/Soccer.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Run It App</Text>
        <Link href={'/(auth)/sign-in'} asChild>
          <Button text="Sign In" />
        </Link>
        <Link href={'/(auth)/sign-up'} asChild>
          <Button text="Create an Account" />
        </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 100,
    backgroundColor: 'white',
  },
  image: {
    width: 200,
    height: 250,
    resizeMode: 'contain', 
    marginBottom: 1, 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
});

export default Index;
