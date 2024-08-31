import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, Stack } from 'expo-router';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, Firestore } from '../firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(Firestore, 'users', user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
      });

      // Send email verification
      await sendEmailVerification(user);

      Alert.alert('Success', 'Account created. Please verify your email before you log in.',
        [{ text: 'Return to Login', onPress: () => navigation.navigate('index') }]
      );

      // Clear form fields after successful signup
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('Sign up error', 'Failed to create account. Please try again.', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign up' }} />

      <Text style={styles.label}>First Name</Text>
      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        placeholder="John"
        style={styles.input}
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        placeholder="Doe"
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="john.doe@example.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        style={styles.input}
        secureTextEntry
      />

      <Button text="Create account" onPress={handleSignUp} />
      <Link href="/sign-in" style={styles.textButton}>
        Sign in
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignUpScreen;
