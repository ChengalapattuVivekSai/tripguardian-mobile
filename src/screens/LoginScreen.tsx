import React,
{
    useState
}
from 'react';

import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity
}
from 'react-native';

import CustomInput
from '../components/CustomInput';

import PrimaryButton
from '../components/PrimaryButton';

import { COLORS }
from '../theme/colors';

import { login }
from '../services/auth';

export default function LoginScreen(
    { navigation }: any
) {

    const [email,setEmail]
        = useState('');

    const [password,setPassword]
        = useState('');

    const [loading,setLoading]
        = useState(false);

    const handleLogin =
        async () => {

        try {

            setLoading(true);

            const response =
                await login({

                    email,
                    password

                });

            if(
                response.user?.role
                ===
                'traveler'
            ){

                navigation.replace(
                    'Traveler'
                );

            }
            else{

                navigation.replace(
                    'Guardian'
                );

            }

        }
        catch(err){

            Alert.alert(
                'Login Failed'
            );

        }
        finally{

            setLoading(false);

        }

    };

    return (

        <View
            style={styles.container}
        >

            <Text
                style={styles.logo}
            >
                🛡️
            </Text>

            <Text
                style={styles.title}
            >
                TripGuardian
            </Text>

            <Text
                style={styles.subtitle}
            >
                Your Journey.
                Always Protected.
            </Text>

            <CustomInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <CustomInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <PrimaryButton
                title="Sign In"
                loading={loading}
                onPress={handleLogin}
            />

            <TouchableOpacity
                onPress={() =>
                    navigation.navigate(
                        'Register'
                    )
                }
            >
                <Text
                    style={
                        styles.link
                    }
                >
                    Create Account
                </Text>
            </TouchableOpacity>

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

    logo:{
        fontSize:50,
        textAlign:'center'
    },

    title:{
        fontSize:32,
        fontWeight:'700',
        textAlign:'center',
        color:COLORS.text
    },

    subtitle:{
        textAlign:'center',
        color:COLORS.gray,
        marginBottom:40
    },

    link:{
        marginTop:20,
        textAlign:'center',
        color:COLORS.primary,
        fontWeight:'600'
    }

});