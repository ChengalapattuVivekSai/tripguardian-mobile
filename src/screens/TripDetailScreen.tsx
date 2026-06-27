import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useTrips } from '../hooks/useTrips';

type Props = NativeStackScreenProps<RootStackParamList, 'TripDetail'>;

export default function TripDetailScreen({ route }: Props) {
  const id = route.params?.id;
  const { getTripById } = useTrips();
  const trip = id ? getTripById(id) : null;

  if (!trip) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Trip not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>{trip.title}</Text>
      <Text style={{ marginTop: 8 }}>{trip.description}</Text>
    </View>
  );
}
