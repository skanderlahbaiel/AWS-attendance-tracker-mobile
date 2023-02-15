import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppTabNavigator from './components/AppTabNavigator';

export default function App() {


  return (
    <NavigationContainer>
      <View style={styles.container}>
        <AppTabNavigator />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',

  },
});
