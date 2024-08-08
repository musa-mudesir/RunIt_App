import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, Button, Alert, TouchableOpacity, TextInput } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Firestore } from '../firebaseconfig';


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
  const [isEditing, setIsEditing] = useState(false);
  const [newWins, setNewWins] = useState(wins);
  const [newLosses, setNewLosses] = useState(losses);
  const [newDraws, setNewDraws] = useState(draws);
  const [newBio, setNewBio] = useState(bio);

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

  const updateProfile = async () => {
    if (!user) return;

    try {
      // Calculate new rating based on wins, losses, and draws
      const newRating = calculateRating(newWins, newLosses, newDraws);

      // Update Firestore
      const userProfileDoc = doc(Firestore, 'profiles', user.uid);
      await setDoc(userProfileDoc, {
        wins: newWins,
        losses: newLosses,
        draws: newDraws,
        bio: newBio,
        rating: newRating
      }, { merge: true });

      // Update local state
      setWins(newWins);
      setLosses(newLosses);
      setDraws(newDraws);
      setBio(newBio);
      setRating(newRating);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating achievements:', error);
      Alert.alert('Error updating achievements', error.message);
    }
  };

  const calculateRating = (wins: number, losses: number, draws: number): number => {
    // Check if all values are zero
    if (wins === 0 && losses === 0 && draws === 0) {
      return 5; // Default rating or midpoint for no games played
    }
  
    // Example formula to calculate a rating based on wins, losses, and draws
    const maxRating = 10; // Maximum rating
    const maxWins = 10; // Max wins considered for rating calculation
    const maxLosses = 10; // Max losses considered for rating calculation
    const maxDraws = 10; // Max draws considered for rating calculation
  
    // Calculate the rating based on the formula
    const rating = (wins - losses * 0.5 + draws * 0.25) / (maxWins - maxLosses * 0.5 + maxDraws * 0.25) * maxRating;
  
    // Ensure rating is between 0 and 10
    return Math.max(0, Math.min(maxRating, rating));
  };

  const increment = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
    setter(prev => prev + value);
  }

  const decrement = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
    setter(prev => Math.max(0, prev - value));
  }

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
      {/* Edit Button */}
      <Button title='Edit Profile' onPress={() => setIsEditing(true)}/>

      {/* Edit Profile Modal */}
{isEditing && (
  <View style={styles.editmodal}>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Wins:</Text>
      <View style={styles.adjustContainer}>
        <Button title="▲" onPress={() => setNewWins(newWins + 1)} />
        <TextInput 
          style={styles.input}
          placeholder="Wins"
          keyboardType='numeric'
          value={newWins.toString()}
          onChangeText={(text) => setNewWins(Number(text))}
        />
        <Button title="▼" onPress={() => setNewWins(Math.max(newWins - 1, 0))} />
      </View>
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.label}>Losses:</Text>
      <View style={styles.adjustContainer}>
        <Button title="▲" onPress={() => setNewLosses(newLosses + 1)} />
        <TextInput 
          style={styles.input}
          placeholder="Losses"
          keyboardType='numeric'
          value={newLosses.toString()}
          onChangeText={(text) => setNewLosses(Number(text))}
        />
        <Button title="▼" onPress={() => setNewLosses(Math.max(newLosses - 1, 0))} />
      </View>
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.label}>Draws:</Text>
      <View style={styles.adjustContainer}>
        <Button title="▲" onPress={() => setNewDraws(newDraws + 1)} />
        <TextInput 
          style={styles.input}
          placeholder="Draws"
          keyboardType='numeric'
          value={newDraws.toString()}
          onChangeText={(text) => setNewDraws(Number(text))}
        />
        <Button title="▼" onPress={() => setNewDraws(Math.max(newDraws - 1, 0))} />
      </View>
    </View>

    <TextInput
      style={styles.input}
      placeholder="Bio"
      value={newBio}
      onChangeText={setNewBio}
    />
    <Button title='Save' onPress={updateProfile}/>
    <Button title='Cancel' onPress={() => setIsEditing(false)}/>
  </View>
)}


    </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
    flexGrow: 1,
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
  editmodal: {
    position: 'absolute',
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: [
      { translateX: -150 }, // Adjust these values to match half of the modal's width
      { translateY: -200 }  // Adjust these values to match half of the modal's height
    ],
    width: '80%', // Adjust width as needed
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    zIndex: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  adjustButtons: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  label: {
    fontSize: 19,
    color: '#323',
    margin: 10,
  },
  adjustContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default ProfileScreen;
