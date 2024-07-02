import { StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { ScrollView } from 'react-native';

export default function CreateGameScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Create Game</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
