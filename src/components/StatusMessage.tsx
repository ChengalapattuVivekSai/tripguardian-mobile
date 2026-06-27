import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { COLORS } from '../theme/colors';

export default function StatusMessage({
  message,
  error,
}: any) {

  if (!message) return null;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            error
              ? '#FEE2E2'
              : '#DCFCE7'
        }
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color:
              error
                ? COLORS.danger
                : COLORS.success
          }
        ]}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },

  text: {
    fontWeight: '600'
  }

});