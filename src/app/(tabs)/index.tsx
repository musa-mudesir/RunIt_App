import { ScrollView, StyleSheet, Image } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import React from 'react';
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Run It</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Image
        style={styles.image}
        source={require('@/src/images/soccernew.jpg')}
        />
        <Text style={styles.description}>
          Welcome to "Run It" – the ultimate app for organizing and managing pickup soccer games with ease! 
          Whether you're looking to join a game or create your own, "Run It" has you covered with all the features 
          you need to enjoy the beautiful game of soccer.
          Get started today and never miss a chance to play!
        </Text>
        <Image
        style={styles.image}
        source={require('@/src/images/Soccer.png')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ADD8E6',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ADD8E6'
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

});

