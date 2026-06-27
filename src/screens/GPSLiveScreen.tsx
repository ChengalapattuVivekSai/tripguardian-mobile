import React,
{
    useEffect,
    useRef,
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

import { COLORS }
from '../theme/colors';

import LiveMap
from '../components/LiveMap';

import {
    getCurrentLocation
}
from '../services/gpsService';

import {
    sendLocation
}
from '../services/gpsApi';

import {
    socket
}
from '../services/socket';

export default function GPSLiveScreen(
{
    navigation
}:any){

    const [location,
        setLocation] =
        useState<any>(null);

    const [seconds,
        setSeconds] =
        useState(0);

    const timerRef =
        useRef<any>(null);

    const gpsRef =
        useRef<any>(null);

    useEffect(()=>{

        startJourney();

        timerRef.current =
            setInterval(()=>{

                setSeconds(
                    prev=>prev+1
                );

            },1000);

        gpsRef.current =
            setInterval(

                async()=>{

                    try{

                        const current =
                            await getCurrentLocation();

                        setLocation(
                            current.coords
                        );

                        const payload = {

                            userId:1,

                            name:
                                'Vivek Sai',

                            latitude:
                                current
                                .coords
                                .latitude,

                            longitude:
                                current
                                .coords
                                .longitude,

                            speed:
                                current
                                .coords
                                .speed
                                ||
                                0,

                            battery:80,

                            status:
                                'LIVE'
                        };

                        await sendLocation(
                            payload
                        );

                        socket.emit(
                            'location-update',
                            payload
                        );

                        console.log(
                            'GPS SENT',
                            payload
                        );

                    }
                    catch(err){

                        console.log(
                            err
                        );

                    }

                },

                10000

            );

        return ()=>{

            clearInterval(
                timerRef.current
            );

            clearInterval(
                gpsRef.current
            );

        };

    },[]);

    const startJourney =
        async()=>{

            const current =
                await getCurrentLocation();

            setLocation(
                current.coords
            );

        };

    const stopJourney =
        ()=>{

            clearInterval(
                timerRef.current
            );

            clearInterval(
                gpsRef.current
            );

            navigation.navigate(
                'Traveler'
            );

        };

    if(!location){

        return(

            <View
                style={styles.loading}
            >

                <Text>
                    Loading GPS...
                </Text>

            </View>

        );

    }

    return(

        <View
            style={styles.container}
        >

            <Text
                style={styles.header}
            >
                LIVE JOURNEY
            </Text>

            <LiveMap

                latitude={
                    location
                    .latitude
                }

                longitude={
                    location
                    .longitude
                }

            />

            <View
                style={styles.bottom}
            >

                <Text
                    style={styles.live}
                >
                    ● LIVE
                </Text>

                <Text>
                    Latitude:
                    {
                        location
                        .latitude
                        .toFixed(6)
                    }
                </Text>

                <Text>
                    Longitude:
                    {
                        location
                        .longitude
                        .toFixed(6)
                    }
                </Text>

                <Text>
                    Speed:
                    {
                        location
                        .speed
                        || 0
                    }
                    km/hr
                </Text>

                <Text>
                    Duration:
                    {
                        seconds
                    }
                    sec
                </Text>

                <TouchableOpacity
                    style={styles.stop}
                    onPress={
                        stopJourney
                    }
                >

                    <Text
                        style={
                            styles.stopText
                        }
                    >
                        STOP JOURNEY
                    </Text>

                </TouchableOpacity>

            </View>

        </View>

    );

}

const styles =
StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:
            COLORS.background
    },

    header:{
        marginTop:50,
        marginBottom:10,
        fontSize:22,
        fontWeight:'700',
        textAlign:'center'
    },

    bottom:{
        backgroundColor:
            COLORS.white,
        padding:20,
        borderTopLeftRadius:25,
        borderTopRightRadius:25
    },

    live:{
        color:
            COLORS.success,
        fontWeight:'700',
        marginBottom:10
    },

    stop:{
        backgroundColor:
            COLORS.danger,
        padding:18,
        marginTop:20,
        borderRadius:15,
        alignItems:'center'
    },

    stopText:{
        color:
            COLORS.white,
        fontWeight:'700'
    },

    loading:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }

});