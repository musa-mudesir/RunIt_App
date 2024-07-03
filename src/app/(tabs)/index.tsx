import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Run It</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.description}>
          Welcome to "Run It" – the ultimate app for organizing and managing pickup soccer games with ease! 
          Whether you're looking to join a game or create your own, "Run It" has you covered with all the features 
          you need to enjoy the beautiful game of soccer.
          Get started today and never miss a chance to play!
        </Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

