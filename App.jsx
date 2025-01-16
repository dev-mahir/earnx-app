import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import mobileAds from 'react-native-google-mobile-ads';
import WelcomeScreen from './screens/WelcomeScreen';
import GameScreen from './screens/GameScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    mobileAds()
      .initialize()
      .then(() => {
        console.log('AdMob Initialized');
      })
      .catch(error => {
        console.error('Failed to initialize AdMob', error);
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{
            title: 'Game',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{
            title: 'Leaderboard',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
