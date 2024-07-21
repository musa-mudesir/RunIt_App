import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, Alert, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Firestore } from '../firebaseconfig'; // Ensure these paths are correct

const icons = [
  require('../icons/iconA.png'),
  require('../icons/argentina.png'),
  require('../icons/portugal.png'),
  require('../icons/ethiopia.png'),
  require('../icons/spain.png'),
  require('../icons/france.png'),
  require('../icons/brazil.png'),
  require('../icons/england.png'),
  require('../icons/united-states.png'),
  require('../icons/germany.png'),
];

const ProfileScreen = () => {
  const [userName, setUserName] = useState('');
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [draws, setDraws] = useState(0);
  const [rating, setRating] = useState(0);
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(icons[0]); // Default to the first icon
  const [iconSelection, setIconSelection] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userProfileDoc = doc(Firestore, 'profiles', user.uid);
        const userProfileSnapshot = await getDoc(userProfileDoc);
        if (userProfileSnapshot.exists()) {
          const userProfileData = userProfileSnapshot.data();
          console.log('User Profile Data:', userProfileData);
          console.log('User Name:', userProfileData.userName);
          setUserName(userProfileData.userName || '');
          setWins(userProfileData.wins || 0);
          setLosses(userProfileData.losses || 0);
          setDraws(userProfileData.draws || 0);
          setRating(userProfileData.rating || 0);
          setBio(userProfileData.bio || '');
          setProfilePicture(userProfileData.profilePicture || icons[0]);
        } else {
          Alert.alert('Profile not found', 'Please complete your profile setup.');
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const selectIcon = async (iconUri: string) => {
    if (!user) return;

    try {
      // Save the selected icon's URI to Firestore
      const userProfileDoc = doc(Firestore, 'profiles', user.uid);
      await setDoc(userProfileDoc, { profilePicture: iconUri }, { merge: true });
      setProfilePicture(iconUri);
      setIconSelection(false);
    } catch (error) {
      console.error('Error updating profile picture:', error);
      Alert.alert('Error updating profile picture', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator} />

      {/* Profile Picture */}
      <Image
        source={profilePicture}
        style={styles.profilePicture}
      />
      <Button title="Change Profile Picture" onPress={() => setIconSelection(true)} />

      {/* Icon Selection Modal */}
      {iconSelection && (
        <View style={styles.iconSelection}>
          {icons.map((icon, index) => (
            <TouchableOpacity key={index} onPress={() => selectIcon(icon)}>
              <Image source={icon} style={styles.icon} />
            </TouchableOpacity>
          ))}
          <Button title="Cancel" onPress={() => setIconSelection(false)} />
        </View>
      )}

      {/* User Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Name:</Text>
        <Text style={styles.infoValue}>{userName}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Record:</Text>
        <Text style={styles.infoValue}>Wins: {wins}</Text>
        <Text style={styles.infoValue}>Losses: {losses}</Text>
        <Text style={styles.infoValue}>Draws: {draws}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Rating:</Text>
        <Text style={styles.infoValue}>{rating.toFixed(1)}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Bio:</Text>
        <Text style={styles.infoValue}>{bio || 'No bio available'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  iconSelection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon: {
    width: 50, // Updated size
    height: 50, // Updated size
    margin: 10,
    borderRadius: 25, // Adjusted to match size
    borderWidth: 2,
    borderColor: '#ddd',
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;
