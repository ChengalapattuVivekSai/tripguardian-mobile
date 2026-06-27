import React from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import {
  COLORS
} from '../theme/colors';

export default function StatusCard({
  title,
  value,
  color
}:any){

  return(

    <View style={styles.card}>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text
        style={[
          styles.value,
          {color}
        ]}
      >
        {value}
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

    shadowColor:'#000',

    shadowOpacity:0.08,

    shadowRadius:10,

    elevation:4
  },

  title:{
    color:COLORS.gray,
    fontSize:14
  },

  value:{
    fontSize:22,
    fontWeight:'700',
    marginTop:10
  }

});