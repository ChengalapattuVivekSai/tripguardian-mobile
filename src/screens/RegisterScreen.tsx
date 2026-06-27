import React,
{
  useState
}
from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
}
from 'react-native';

import {
  COLORS
}
from '../theme/colors';

import CustomInput
from '../components/CustomInput';

import PrimaryButton
from '../components/PrimaryButton';

import StatusMessage
from '../components/StatusMessage';

import {
  register
}
from '../services/auth';

export default function RegisterScreen(
{
  navigation
}:any
){

  const [name,setName]
      = useState('');

  const [email,setEmail]
      = useState('');

  const [password,setPassword]
      = useState('');

  const [role,setRole]
      = useState<'traveler' | 'guardian'>('traveler');

  const [message,setMessage]
      = useState('');

  const [error,setError]
      = useState(false);

  const [loading,setLoading]
      = useState(false);

  const handleRegister =
      async()=>{

    try{

      setLoading(true);

      const response =
        await register({

          name,
          email,
          password,
          role

        });

      setError(false);

      setMessage(
        response.message
      );

      setTimeout(()=>{

        navigation.replace(
          'Login'
        );

      },1500);

    }
    catch(err:any){

      setError(true);

      const backendMessage =
        err?.response?.data?.message ||
        err?.message ||
        'Registration Failed';

      setMessage(
        backendMessage.includes('Network Error')
          ? 'Unable to reach the backend. Make sure the backend is running and the API URL is correct.'
          : backendMessage
      );

    }
    finally{

      setLoading(false);

    }

  };

  return(

    <View
      style={styles.container}
    >

      <Text
        style={styles.title}
      >
        Create Account
      </Text>

      <Text
        style={styles.subtitle}
      >
        Join TripGuardian
      </Text>

      <StatusMessage
        message={message}
        error={error}
      />

      <CustomInput
        placeholder='Full Name'
        value={name}
        onChangeText={setName}
      />

      <CustomInput
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
      />

      <CustomInput
        placeholder='Password'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View
        style={styles.roleRow}
      >

        <TouchableOpacity
          style={[
            styles.role,
            role==='traveler'
            &&
            styles.selected
          ]}
          onPress={()=>
            setRole(
              'traveler'
            )
          }
        >

          <Text>
            🚶 Traveler
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.role,
            role==='guardian'
            &&
            styles.selected
          ]}
          onPress={()=>
            setRole(
              'guardian'
            )
          }
        >

          <Text>
            🛡 Guardian
          </Text>

        </TouchableOpacity>

      </View>

      <PrimaryButton
        title='Create Account'
        loading={loading}
        onPress={
          handleRegister
        }
      />

    </View>

  );

}

const styles =
StyleSheet.create({

  container:{
    flex:1,
    justifyContent:
      'center',
    padding:24,
    backgroundColor:
      COLORS.background
  },

  title:{
    fontSize:32,
    fontWeight:'700'
  },

  subtitle:{
    color:COLORS.gray,
    marginBottom:30
  },

  roleRow:{
    flexDirection:'row',
    justifyContent:
      'space-between',
    marginBottom:20
  },

  role:{
    width:'48%',
    backgroundColor:
      COLORS.white,
    padding:18,
    borderRadius:14,
    borderWidth:1,
    borderColor:
      COLORS.border
  },

  selected:{
    borderColor:
      COLORS.primary,
    borderWidth:2
  }

});