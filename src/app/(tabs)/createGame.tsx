import { StyleSheet, ScrollView, Text, View } from 'react-native';
import React from 'react';

export default function CreateGameScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Create Game</Text>
        <View style={styles.separator}/>
        {/* Add your create game form here */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '79%',
    backgroundColor: 'black'
  },
});
