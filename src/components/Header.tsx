import React from 'react';
import { View, Text } from 'react-native';

export default function Header({ title = '' }: { title?: string }) {
  return (
    <View style={{ padding: 16, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 18, fontWeight: '700' }}>{title}</Text>
    </View>
  );
}
