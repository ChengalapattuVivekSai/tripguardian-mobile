import React from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import {
  COLORS
} from '../theme/colors';

export default function InfoCard({
  title,
  line1,
  line2
}:any){

  return(

    <View style={styles.card}>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.text}>
        {line1}
      </Text>

      <Text style={styles.text}>
        {line2}
      </Text>

    </View>

  );

}

const styles =
StyleSheet.create({

  card:{
    backgroundColor:
      COLORS.white,

    padding:20,

    borderRadius:18,

    marginBottom:18,

    elevation:4
  },

  title:{
    fontSize:15,
    color:COLORS.gray,
    marginBottom:10
  },

  text:{
    fontSize:16,
    marginBottom:5
  }

});