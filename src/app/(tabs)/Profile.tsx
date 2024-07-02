import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';

export default function ProfileScreen() {
  const [userName, setUserName] = useState('John Doe');
  const [wins, setWins] = useState(10);
  const [losses, setLosses] = useState(5);
  const [draws, setDraws] = useState(2);
  const [rating, setRating] = useState(4.5);
  const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator}/>
      {/* Profile Picture */}
      <Image
        source={{ uri: 'https://example.com/your-profile-picture-url.jpg' }}
        style={styles.profilePicture}
      />
      
      {/* User Name */}
      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        value={userName}
        placeholder="Enter your name"
      />
      
      {/* User Record */}
      <View style={styles.recordContainer}>
        <Text style={styles.recordTitle}>Record</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setWins(parseInt(text))}
          value={wins.toString()}
          placeholder="Wins"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLosses(parseInt(text))}
          value={losses.toString()}
          placeholder="Losses"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setDraws(parseInt(text))}
          value={draws.toString()}
          placeholder="Draws"
          keyboardType="numeric"
        />
      </View>
      
      {/* User Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>Rating</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setRating(parseFloat(text))}
          value={rating.toString()}
          placeholder="Rating"
          keyboardType="numeric"
        />
      </View>
      
      {/* Bio or Description */}
      <View style={styles.bioContainer}>
        <Text style={styles.bioTitle}>Bio</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          onChangeText={setBio}
          value={bio}
          placeholder="Enter your bio"
          multiline
        />
      </View>

      <Button title="Save Profile" onPress={() => alert('Profile saved!')} />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
  },
  recordContainer: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
  },
  recordTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  ratingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bioContainer: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  bioTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
