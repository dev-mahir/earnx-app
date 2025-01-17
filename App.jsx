import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import mobileAds from 'react-native-google-mobile-ads';
import WelcomeScreen from './screens/WelcomeScreen';
import GameScreen from './screens/WordGameScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import SettingsScreen from './screens/SettingsScreen'; // Add a settings screen as an example
import Ionicons from 'react-native-vector-icons/Ionicons';
import Leaderboard from './screens/LeaderboardScreen';
import ReferScreen from './screens/ReferScreen';
import ProfileScreen from './screens/ProfieScreen';
import HomeScreen from './screens/HomeScreen';
import TestScreen from './screens/TestScreen';
import WordGameScreen from './screens/WordGameScreen';
import CarGameScreen from './screens/CarGameScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [hasInternet, setHasInternet] = useState(false);

  // useEffect(() => {
  //   // Check internet connection
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     setHasInternet(state.isConnected && state.isInternetReachable);
  //   });

  //   // Clean up the subscription
  //   return () => unsubscribe();
  // }, []);

  // if (!hasInternet) {
  //   return (
  //     <View style={styles.noInternetContainer}>
  //       <Text style={styles.noInternetText}>No Internet Connection</Text>
  //       <Button
  //         title="Retry"
  //         onPress={() =>
  //           NetInfo.fetch().then(state =>
  //             setHasInternet(state.isConnected && state.isInternetReachable),
  //           )
  //         }
  //       />
  //     </View>
  //   );
  // }

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

  // Stack Navigator for Game
  const GameStack = () => (
    <Stack.Navigator initialRouteName="Homes">
      <Stack.Screen
        name="Homes"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
        }}
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
        }}
      />
      <Stack.Screen
        name="Refer"
        component={ReferScreen}
        options={{
          title: 'Refer',
        }}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="TestScreen"
        component={TestScreen}
        options={{
          title: 'TestScreen',
        }}
      />

      <Stack.Screen
        name="WordGameScreen"
        component={WordGameScreen}
        options={{
          title: 'Word Game',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CarGameScreen"
        component={CarGameScreen}
        options={{
          title: 'Car Game',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Leaderboard') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Home"
          component={GameStack}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Homes"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Leaderboard"
          component={Leaderboard}
          options={{
            title: 'Leaderboard',
            headerShown: true,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{title: 'Profile'}}
        />

        <Tab.Screen
          name="TestScreen"
          component={TestScreen}
          options={{title: 'TestScreen'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
