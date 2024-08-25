import { ScrollView, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import React from 'react';

export default function HomeScreen() {
  const handleContactPress = () => {
    
    Linking.openURL("https://www.instagram.com/ethiowalid/"); // Link allows user to contact developer
  };
// Frontend for Home Page 
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Run It</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Image
          style={styles.image}
          source={require('@/src/images/soccernew.jpg')}
        /> {/* Shows the description of the app for users as soon as they log in */}
        <Text style={styles.description}> 
          Welcome to "Run It" – the ultimate app for organizing and managing pickup soccer games with ease! 
          Whether you're looking to join a game or create your own, "Run It" has you covered with all the features 
          you need to enjoy the beautiful game of soccer.
          Get started today and never miss a chance to play!
        </Text>
        <Image
          style={styles.image} {/* Displaying intreractive image to catch the users eye */}
          source={require('@/src/images/Soccer.png')}
        />
        <View style={styles.missionContainer}>
          <Text style={styles.missionDescription}>
            Our mission at Run It is to bring soccer players together, making it easy for players to find and organize games.
            We aim to foster a vibrant community where everyone, from beginners to seasoned players, can enjoy the game they love!
          </Text>
        </View>
        <Image
          style={styles.image}
          source={require('@/src/images/run_it.jpg')}
        />
        <View style={styles.contactSection}>
          <Text style={styles.contactDescription}>
            If you have any questions, feedback, or encountered any bugs, please feel free to contact our developers.
          </Text>
          <TouchableOpacity style={styles.contactContainer} onPress={handleContactPress}>
            <Text style={styles.contactText}>Contact Developers</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
// The designing styles for the front home page.

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#008CBA',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 1,
    height: 0,
    width: '80%',
  },
  description: {
    color: '#008CBA',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'Helvetica, Arial, sans-serif',
  },
  image: {
    width: '100%',
    height: 250,
    marginTop: 0,
    marginBottom: 15,
  },
  missionContainer: {
    padding: 20,
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  missionDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#008CBA',
  },
  contactSection: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  contactDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  contactContainer: {
    padding: 10,
    backgroundColor: '#008CBA',
    borderRadius: 5,
  },
  contactText: {
    fontSize: 16,
    color: '#fff',
  },
});
