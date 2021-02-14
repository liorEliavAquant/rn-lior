import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import { BlogsProvider } from './src/blogs.context';
import { EditPost } from './src/screens/EditPost';
const { Navigator, Screen } = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <BlogsProvider>
        <StatusBar />
        <Navigator initialRouteName='home'>
          <Screen name='home' component={HomeScreen} />
          <Screen name='edit' component={EditPost} />
        </Navigator>
      </BlogsProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
