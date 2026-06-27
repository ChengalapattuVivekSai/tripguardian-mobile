import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import {
  COLORS
} from '../theme/colors';

import StatusCard
from '../components/StatusCard';

import InfoCard
from '../components/InfoCard';

import PrimaryButton
from '../components/PrimaryButton';

export default function TravelerDashboard(
{
  navigation
}:any){

  return(

    <ScrollView
      style={styles.container}
    >

      <View style={styles.headerRow}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.hello}>
            Hello Vivek 👋
          </Text>

          <Text style={styles.subtitle}>
            Traveler Dashboard
          </Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          }
        >
          <Text style={styles.logoutText}>⏻</Text>
        </TouchableOpacity>
      </View>

      <StatusCard
        title="Journey Status"
        value="● OFFLINE"
        color={COLORS.danger}
      />

      <StatusCard
        title="Safety Score"
        value="98%"
        color={COLORS.success}
      />

      <InfoCard
        title="Today's Activity"
        line1="Distance : 0 km"
        line2="Duration : 0 min"
      />

      <InfoCard
        title="Emergency Contact"
        line1="Guardian : 1"
        line2="Connected"
      />

      <PrimaryButton
        title="START JOURNEY"
        onPress={() =>
          navigation.navigate(
            'GPSLive'
          )
        }
      />

    </ScrollView>

  );

}

const styles =
StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:
      COLORS.background,
    padding:20
  },

  headerRow:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  headerTextContainer:{
    flex: 1
  },

  hello:{
    fontSize:30,
    fontWeight:'700'
  },

  subtitle:{
    color:COLORS.gray,
    marginBottom:0
  },

  logoutButton:{
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },

  logoutText:{
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700'
  }

});