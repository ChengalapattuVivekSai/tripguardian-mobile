import React from 'react';

import {
  ScrollView,
  Text,
  StyleSheet
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

export default function GuardianDashboard(
{
  navigation
}:any){

  return(

    <ScrollView
      style={styles.container}
    >

      <Text style={styles.title}>
        Guardian Dashboard
      </Text>

      <StatusCard
        title="Traveler Status"
        value="● ONLINE"
        color={COLORS.success}
      />

      <InfoCard
        title="Traveler"
        line1="Vivek Sai"
        line2="Last seen: now"
      />

      <InfoCard
        title="Current Location"
        line1="Chennai"
        line2="Battery : 78%"
      />

      <PrimaryButton
        title="VIEW JOURNEY"
        onPress={() =>
          navigation.navigate(
            'GuardianLive'
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
    padding:20,
    backgroundColor:
      COLORS.background
  },

  title:{
    marginTop:50,
    fontSize:30,
    fontWeight:'700',
    marginBottom:30
  }

});