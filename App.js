import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeComponent from './components/HomeComponent';
import NNNSignInComponent from './components/NNNSignInComponent';
import DonatorSignInComponent from './components/DonatorSignInComponent';
import UserContainerComponent from './components/UserContainerComponent';
import DonorContainerComponent from './components/DonorContainerComponent';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#5887ff" barStyle={'light-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeComponent} />
        <Stack.Screen name="NNNSignIn" component={NNNSignInComponent} />
        <Stack.Screen name="UserContainer" component={UserContainerComponent} />
        <Stack.Screen name="DonorContainer" component={DonorContainerComponent} />
        <Stack.Screen name="DonatorSignIn" component={DonatorSignInComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}