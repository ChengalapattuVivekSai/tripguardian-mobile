import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

export type RootStackParamList = {
  Home: undefined;
  TripDetail: { id: string };
};

export default function App() {
  return <AppNavigator />;
}