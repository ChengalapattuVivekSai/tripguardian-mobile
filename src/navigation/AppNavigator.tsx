import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TravelerDashboard from '../screens/TravelerDashboard';
import GuardianDashboard from '../screens/GuardianDashboard';
import GPSLiveScreen from '../screens/GPSLiveScreen';
import GuardianLiveScreen from '../screens/GuardianLiveScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        <Stack.Screen
          name="Traveler"
          component={TravelerDashboard}
        />

        <Stack.Screen
          name="Guardian"
          component={GuardianDashboard}
        />

        <Stack.Screen
          name="GPSLive"
          component={GPSLiveScreen}
        />

        <Stack.Screen
          name="GuardianLive"
          component={GuardianLiveScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}