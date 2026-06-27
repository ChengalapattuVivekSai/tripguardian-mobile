import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import TripCard from '../components/TripCard';
import { useTrips } from '../hooks/useTrips';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { trips } = useTrips();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Upcoming Trips</Text>
        <FlatList
          data={trips}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TripCard
              trip={item}
              onPress={() => navigation.navigate('TripDetail', { id: item.id })}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
