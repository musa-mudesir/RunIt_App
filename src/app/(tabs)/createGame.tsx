// import React, { useState, useEffect } from 'react';
// import {
//   View, Text, TextInput, Button, StyleSheet, Alert, FlatList, Modal, TouchableOpacity
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { getAuth } from 'firebase/auth';
// import { collection, addDoc, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
// import { Firestore } from '../firebaseconfig';

// const CreateGameScreen = () => {
//   const [gameTitle, setGameTitle] = useState('');
//   const [location, setLocation] = useState('');
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [playersNeeded, setPlayersNeeded] = useState(1); // init with a default value
//   const [description, setDescription] = useState('');
//   const [games, setGames] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [mode, setMode] = useState<'date' | 'time'>('date');

//   const auth = getAuth();
//   const user = auth.currentUser;

//   const handleCreateGame = async () => {
//     if (!user) {
//       Alert.alert('You must be signed in to create a game.');
//       return;
//     }

//     if (!gameTitle || !location || !date || !playersNeeded) {
//       Alert.alert('Please fill in all required fields.');
//       return;
//     }

//     try {
//       const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));

//       await addDoc(collection(Firestore, 'games'), {
//         gameTitle,
//         location,
//         date: date.toISOString(),
//         playersNeeded,
//         description,
//         createdBy: user.uid,
//         playersJoined: [],
//       });
//       Alert.alert('Game created successfully!');
//       setModalVisible(false);
//       fetchGames(); // Fetch games after creating a new one
//     } catch (error) {
//       Alert.alert('Error creating game:', error.message);
//     }
//   };

//   const fetchGames = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(Firestore, 'games'));
//       const fetchedGames = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       console.log('Fetched games:', fetchedGames);
//       setGames(fetchedGames);
//     } catch (error) {
//       Alert.alert('Error fetching games:', error.message);
//     }
//   };

//   const handleJoinGame = async (gameId: string) => {
//     if (!user) {
//       Alert.alert('You must be signed in to join a game.');
//       return;
//     }

//     try {
//       const gameRef = doc(Firestore, 'games', gameId);
//       await updateDoc(gameRef, {
//         playersJoined: arrayUnion(user.uid),
//       });
//       Alert.alert('You have successfully joined the game!');
//       fetchGames(); // Refresh the game list
//     } catch (error) {
//       Alert.alert('Error joining game:', error.message);
//     }
//   };

//   useEffect(() => {
//     fetchGames();
//   }, []);

//   const handleDateChange = (event: any, selectedDate: Date) => {
//     const currentDate = selectedDate || date;
//     setShowDatePicker(false);
//     setDate(currentDate);
//   };

//   const showMode = (currentMode: 'date' | 'time') => {
//     setShowDatePicker(true);
//     setMode(currentMode);
//   };

//   const incrementPlayersNeeded = () => {
//     setPlayersNeeded(prev => prev + 1);
//   };

//   const decrementPlayersNeeded = () => {
//     setPlayersNeeded(prev => (prev > 1 ? prev - 1 : 1)); // Ensure playersNeeded does not go below 1
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.createButton}
//         onPress={() => setModalVisible(true)} 
//       >
//         <Text style={styles.createButtonText}>Create Game</Text>
//       </TouchableOpacity>

//       <Text style={styles.sectionTitle}>Available Games</Text>
//       <FlatList
//         data={games}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.gameItem}>
//             <Text style={styles.gameTitle}>{item.gameTitle}</Text>
//             <Text>{item.location.latitude}, {item.location.longitude}</Text>
//             <Text>{new Date(item.date).toLocaleString()}</Text>
//             <Text>Players Needed: {item.playersNeeded}</Text>
//             <Text>Description: {item.description}</Text>
//             <Button title="Join Game" onPress={() => handleJoinGame(item.id)} />
//           </View>
//         )}
//       />

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalView}>
//           <Text style={styles.label}>Game Title</Text>
//           <TextInput
//             value={gameTitle}
//             onChangeText={setGameTitle}
//             style={styles.input}
//           />
//           <Text style={styles.label}>Location:</Text>
//           <TextInput
//             value={location}
//             onChangeText={setLocation}
//             style={styles.input}
//           />
//           <Text style={styles.label}>Date & Time</Text>
//           <TouchableOpacity onPress={() => showMode('date')}>
//             <Text>{date.toLocaleDateString()}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => showMode('time')}>
//             <Text>{date.toLocaleTimeString()}</Text>
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               value={date}
//               mode={mode}
//               display="default"
//               onChange={handleDateChange}
//             />
//           )}
//           <Text></Text>
//           <Text style={styles.label}>Players Needed</Text>
//           <View style={styles.playersNeededContainer}>
//             <TouchableOpacity style={styles.button} onPress={decrementPlayersNeeded}>
//               <Text style={styles.buttonText}>-</Text>
//             </TouchableOpacity>
//             <TextInput
//               value={playersNeeded.toString()}
//               onChangeText={(text) => setPlayersNeeded(parseInt(text))}
//               keyboardType="numeric"
//               style={styles.playersNeededInput}
//             />
//             <TouchableOpacity style={styles.button} onPress={incrementPlayersNeeded}>
//               <Text style={styles.buttonText}>+</Text>
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.label}>Description</Text>
//           <TextInput
//             value={description}
//             onChangeText={setDescription}
//             style={styles.input}
//           />
//           <Button title="Create Game" onPress={handleCreateGame} />
//           <Button title="Cancel" onPress={() => setModalVisible(false)} />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   createButton: {
//     backgroundColor: 'blue',
//     padding: 10,
//     marginBottom: 20,
//     borderRadius: 5,
//   },
//   createButtonText: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   gameItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray',
//   },
//   gameTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   modalView: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: [
//       { translateX: -160 }, 
//       { translateY: -200 }  
//     ],
//     width: '70%', 
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     elevation: 5,
//     zIndex: 10,
//   },
//   label: {
//     marginBottom: 5,
//     fontWeight: 'bold',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'black',
//     padding: 10,
//     marginBottom: 20,
//     borderRadius: 5,
//   },
//   playersNeededContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   playersNeededInput: {
//     borderWidth: 1,
//     borderColor: 'black',
//     padding: 10,
//     marginHorizontal: 10,
//     width: 60,
//     textAlign: 'center',
//     borderRadius: 5,
//   },
//   button: {
//     backgroundColor: 'gray',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//   },
// });

// export default CreateGameScreen;







// import React, { useState, useEffect } from 'react';
// import {
//   View, Text, TextInput, Button, StyleSheet, Alert, FlatList, Modal, TouchableOpacity
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { getAuth } from 'firebase/auth';
// import { collection, addDoc, getDocs, doc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
// import { Firestore } from '../firebaseconfig';

// const CreateGameScreen = () => {
//   const [gameTitle, setGameTitle] = useState('');
//   const [location, setLocation] = useState('');
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [playersNeeded, setPlayersNeeded] = useState(1); // init with a default value
//   const [description, setDescription] = useState('');
//   const [games, setGames] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [mode, setMode] = useState<'date' | 'time'>('date');

//   const auth = getAuth();
//   const user = auth.currentUser;

//   const handleCreateGame = async () => {
//     if (!user) {
//       Alert.alert('You must be signed in to create a game.');
//       return;
//     }

//     if (!gameTitle || !location || !date || !playersNeeded) {
//       Alert.alert('Please fill in all required fields.');
//       return;
//     }

//     try {
//       const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));

//       await addDoc(collection(Firestore, 'games'), {
//         gameTitle,
//         location: { latitude, longitude },
//         date: date.toISOString(),
//         playersNeeded,
//         description,
//         createdBy: user.uid,
//         playersJoined: [],
//       });
//       Alert.alert('Game created successfully!');
//       setModalVisible(false);
//       fetchGames(); // Fetch games after creating a new one
//     } catch (error) {
//       Alert.alert('Error creating game:', error.message);
//     }
//   };

//   const fetchGames = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(Firestore, 'games'));
//       const fetchedGames = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       console.log('Fetched games:', fetchedGames);
//       setGames(fetchedGames);
//     } catch (error) {
//       Alert.alert('Error fetching games:', error.message);
//     }
//   };

//   const handleJoinGame = async (gameId: string, currentPlayersJoined: string[], playersNeeded: number) => {
//     if (!user) {
//       Alert.alert('You must be signed in to join a game.');
//       return;
//     }

//     if (currentPlayersJoined.includes(user.uid)) {
//       Alert.alert('You have already joined this game.');
//       return;
//     }

//     if (currentPlayersJoined.length >= playersNeeded) {
//       Alert.alert('This game is already full.');
//       return;
//     }

//     try {
//       const gameRef = doc(Firestore, 'games', gameId);
//       await updateDoc(gameRef, {
//         playersJoined: arrayUnion(user.uid),
//         playersNeeded: increment(-1),
//       });
//       Alert.alert('You have successfully joined the game!');
//       fetchGames(); // Refresh the game list
//     } catch (error) {
//       Alert.alert('Error joining game:', error.message);
//     }
//   };

//   useEffect(() => {
//     fetchGames();
//   }, []);

//   const handleDateChange = (event: any, selectedDate: Date) => {
//     const currentDate = selectedDate || date;
//     setShowDatePicker(false);
//     setDate(currentDate);
//   };

//   const showMode = (currentMode: 'date' | 'time') => {
//     setShowDatePicker(true);
//     setMode(currentMode);
//   };

//   const incrementPlayersNeeded = () => {
//     setPlayersNeeded(prev => prev + 1);
//   };

//   const decrementPlayersNeeded = () => {
//     setPlayersNeeded(prev => (prev > 1 ? prev - 1 : 1)); // Ensure playersNeeded does not go below 1
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.createButton}
//         onPress={() => setModalVisible(true)} 
//       >
//         <Text style={styles.createButtonText}>Create Game</Text>
//       </TouchableOpacity>

//       <Text style={styles.sectionTitle}>Available Games</Text>
//       <FlatList
//         data={games}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.gameItem}>
//             <Text style={styles.gameTitle}>{item.gameTitle}</Text>
//             <Text>{item.location.latitude}, {item.location.longitude}</Text>
//             <Text>{new Date(item.date).toLocaleString()}</Text>
//             <Text>Players Joined: {item.playersJoined.length}</Text>
//             <Text>Players Needed: {item.playersNeeded}</Text>
//             <Text>Description: {item.description}</Text>
//             <Button
//               title="Join Game"
//               onPress={() => handleJoinGame(item.id, item.playersJoined, item.playersNeeded)}
//               disabled={item.playersJoined.length >= item.playersNeeded}
//             />
//           </View>
//         )}
//       />

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalView}>
//           <Text style={styles.label}>Game Title</Text>
//           <TextInput
//             value={gameTitle}
//             onChangeText={setGameTitle}
//             style={styles.input}
//           />
//           <Text style={styles.label}>Location:</Text>
//           <TextInput
//             value={location}
//             onChangeText={setLocation}
//             style={styles.input}
//           />
//           <Text style={styles.label}>Date & Time</Text>
//           <TouchableOpacity onPress={() => showMode('date')}>
//             <Text>{date.toLocaleDateString()}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => showMode('time')}>
//             <Text>{date.toLocaleTimeString()}</Text>
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               value={date}
//               mode={mode}
//               display="default"
//               onChange={handleDateChange}
//             />
//           )}
//           <Text></Text>
//           <Text style={styles.label}>Players Needed</Text>
//           <View style={styles.playersNeededContainer}>
//             <TouchableOpacity style={styles.button} onPress={decrementPlayersNeeded}>
//               <Text style={styles.buttonText}>-</Text>
//             </TouchableOpacity>
//             <TextInput
//               value={playersNeeded.toString()}
//               onChangeText={(text) => setPlayersNeeded(parseInt(text))}
//               keyboardType="numeric"
//               style={styles.playersNeededInput}
//             />
//             <TouchableOpacity style={styles.button} onPress={incrementPlayersNeeded}>
//               <Text style={styles.buttonText}>+</Text>
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.label}>Description</Text>
//           <TextInput
//             value={description}
//             onChangeText={setDescription}
//             style={styles.input}
//           />
//           <Button title="Create Game" onPress={handleCreateGame} />
//           <Button title="Cancel" onPress={() => setModalVisible(false)} />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   createButton: {
//     backgroundColor: 'blue',
//     padding: 10,
//     marginBottom: 20,
//     borderRadius: 5,
//   },
//   createButtonText: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   gameItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray',
//   },
//   gameTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   modalView: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: [
//       { translateX: -160 }, 
//       { translateY: -200 }  
//     ],
//     width: '70%', 
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     elevation: 5,
//     zIndex: 10,
//   },
//   label: {
//     marginBottom: 5,
//     fontWeight: 'bold',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'black',
//     padding: 10,
//     marginBottom: 15,
//     borderRadius: 5,
//   },
//   playersNeededContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   button: {
//     backgroundColor: 'gray',
//     padding: 10,
//     borderRadius: 5,
//     margin: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 20,
//   },
//   playersNeededInput: {
//     borderWidth: 1,
//     borderColor: 'black',
//     padding: 10,
//     width: 60,
//     textAlign: 'center',
//     marginHorizontal: 5,
//   },
// });

// export default CreateGameScreen;

import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Alert, FlatList, Modal, TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, updateDoc, arrayUnion, query, where, deleteDoc } from 'firebase/firestore';
import { Firestore } from '../firebaseconfig';

const CreateGameScreen = () => {
  const [gameTitle, setGameTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [playersNeeded, setPlayersNeeded] = useState(1);
  const [description, setDescription] = useState('');
  const [games, setGames] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');

  const auth = getAuth();
  const user = auth.currentUser;

  const handleCreateGame = async () => {
    if (!user) {
      Alert.alert('You must be signed in to create a game.');
      return;
    }

    if (!gameTitle || !location || !date || !playersNeeded) {
      Alert.alert('Please fill in all required fields.');
      return;
    }

    try {
      await deletePastGames();

      const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));

      await addDoc(collection(Firestore, 'games'), {
        gameTitle,
        location,
        date: date.toISOString(),
        playersNeeded,
        description,
        createdBy: user.uid,
        playersJoined: [],
      });
      Alert.alert('Game created successfully!');
      setModalVisible(false);
      fetchGames(); // Fetch games after creating a new one
    } catch (error) {
      Alert.alert('Error creating game:', error.message);
    }
  };

  const fetchGames = async () => {
    try {
      await deletePastGames();

      const querySnapshot = await getDocs(collection(Firestore, 'games'));
      const fetchedGames = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched games:', fetchedGames);
      setGames(fetchedGames);
    } catch (error) {
      Alert.alert('Error fetching games:', error.message);
    }
  };

  const handleJoinGame = async (gameId: string, playersJoined: string[], playersNeeded: number) => {
    if (!user) {
      Alert.alert('You must be signed in to join a game.');
      return;
    }

    if (playersJoined.includes(user.uid)) {
      Alert.alert('You have already joined this game.');
      return;
    }

    if (playersJoined.length >= playersNeeded) {
      Alert.alert('This game is already full.');
      return;
    }

    try {
      const gameRef = doc(Firestore, 'games', gameId);
      await updateDoc(gameRef, {
        playersJoined: arrayUnion(user.uid),
      });
      Alert.alert('You have successfully joined the game!');
      fetchGames(); // Refresh the game list
    } catch (error) {
      Alert.alert('Error joining game:', error.message);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleDateChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShowDatePicker(true);
    setMode(currentMode);
  };

  const incrementPlayersNeeded = () => {
    setPlayersNeeded(prev => prev + 1);
  };

  const decrementPlayersNeeded = () => {
    setPlayersNeeded(prev => (prev > 1 ? prev - 1 : 1));
  };

  const deletePastGames = async () => {
    try {
      const now = new Date();
      const gamesQuery = query(collection(Firestore, 'games'), where('date', '<', now.toISOString()));
      const querySnapshot = await getDocs(gamesQuery);

      querySnapshot.forEach(async (gameDoc) => {
        await deleteDoc(doc(Firestore, 'games', gameDoc.id));
        console.log(`Deleted game with ID: ${gameDoc.id}`);
      });

    } catch (error) {
      console.error('Error deleting past games:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.createButtonText}>Create Game</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Available Games</Text>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.gameItem}>
            <Text style={styles.gameTitle}>{item.gameTitle}</Text>
            <Text>{item.location}</Text>
            <Text>{new Date(item.date).toLocaleString()}</Text>
            <Text>Players Needed: {item.playersNeeded - item.playersJoined.length}</Text>
            <Text>Description: {item.description}</Text>
            <Button 
              title="Join Game" 
              onPress={() => handleJoinGame(item.id, item.playersJoined, item.playersNeeded)} 
              disabled={item.playersJoined.length >= item.playersNeeded}
            />
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.label}>Game Title</Text>
          <TextInput
            value={gameTitle}
            onChangeText={setGameTitle}
            style={styles.input}
          />
          <Text style={styles.label}>Location:</Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />
          <Text style={styles.label}>Date & Time</Text>
          <TouchableOpacity onPress={() => showMode('date')}>
            <Text>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showMode('time')}>
            <Text>{date.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode={mode}
              display="default"
              onChange={handleDateChange}
            />
          )}
          <Text style={styles.label}>Players Needed</Text>
          <View style={styles.playersNeededContainer}>
            <TouchableOpacity style={styles.button} onPress={decrementPlayersNeeded}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              value={playersNeeded.toString()}
              onChangeText={(text) => setPlayersNeeded(parseInt(text))}
              keyboardType="numeric"
              style={styles.playersNeededInput}
            />
            <TouchableOpacity style={styles.button} onPress={incrementPlayersNeeded}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <Button title="Create Game" onPress={handleCreateGame} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  createButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  createButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gameItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalView: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -160 },
      { translateY: -200 }
    ],
    width: '70%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    zIndex: 10,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  playersNeededContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  playersNeededInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    width: 60,
    textAlign: 'center',
  },
});

export default CreateGameScreen;
