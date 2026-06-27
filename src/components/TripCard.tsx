import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Trip } from '../types';

type Props = {
  trip: Trip;
  onPress?: () => void;
};

export default function TripCard({ trip, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
      <View>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>{trip.title}</Text>
        <Text style={{ color: '#666', marginTop: 4 }}>{trip.date}</Text>
      </View>
    </TouchableOpacity>
  );
}
