import React,
{
    useEffect,
    useState
}
from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
}
from 'react-native';

import { COLORS }
from '../theme/colors';

import LiveMap
from '../components/LiveMap';

import { socket }
from '../services/socket';

export default function GuardianLiveScreen() {

    const [traveller,
        setTraveller] =
        useState<any>(null);

    const [trackingTime,
        setTrackingTime] =
        useState(0);

    const [connected,
        setConnected] =
        useState(false);

    useEffect(() => {

        const timer =
            setInterval(() => {

                setTrackingTime(
                    prev => prev + 1
                );

            }, 1000);

        socket.on(
            'connect',
            () => {

                console.log(
                    'Socket Connected'
                );

                setConnected(
                    true
                );

            }
        );

        socket.on(
            'disconnect',
            () => {

                console.log(
                    'Socket Disconnected'
                );

                setConnected(
                    false
                );

            }
        );

        socket.on(

            'location-update',

            data => {

                console.log(
                    'GPS RECEIVED',
                    data
                );

                setTraveller({

                    id:
                        data.userId,

                    name:
                        data.name,

                    latitude:
                        data.latitude,

                    longitude:
                        data.longitude,

                    speed:
                        data.speed,

                    battery:
                        data.battery,

                    status:
                        data.status,

                    lastUpdate:
                        new Date()
                            .toLocaleTimeString()

                });

            }

        );

        return () => {

            clearInterval(
                timer
            );

            socket.off(
                'connect'
            );

            socket.off(
                'disconnect'
            );

            socket.off(
                'location-update'
            );

        };

    }, []);

    if (!traveller) {

        return (

            <View
                style={styles.loading}
            >

                <ActivityIndicator
                    size="large"
                />

                <Text
                    style={{
                        marginTop: 20
                    }}
                >
                    Waiting for traveler...
                </Text>

                <Text>
                    Socket:
                    {
                        connected
                            ?
                            ' Connected'
                            :
                            ' Disconnected'
                    }
                </Text>

            </View>

        );

    }

    return (

        <View
            style={styles.container}
        >

            {/* HEADER */}

            <View
                style={styles.header}
            >

                <Text
                    style={styles.headerTitle}
                >
                    Guardian Live Tracking
                </Text>

            </View>

            {/* MAP */}

            <View
                style={styles.mapContainer}
            >

                <LiveMap

                    latitude={
                        traveller.latitude
                    }

                    longitude={
                        traveller.longitude
                    }

                />

            </View>

            {/* BOTTOM PANEL */}

            <ScrollView
                style={
                    styles.bottomSheet
                }
            >

                <View
                    style={
                        styles.statusRow
                    }
                >

                    <Text
                        style={
                            styles.live
                        }
                    >
                        ● {
                            traveller.status
                        }
                    </Text>

                    <Text>
                        Tracking:
                        {
                            trackingTime
                        }
                        sec
                    </Text>

                </View>

                <View
                    style={
                        styles.card
                    }
                >

                    <Text
                        style={
                            styles.title
                        }
                    >
                        Traveler
                    </Text>

                    <Text>
                        {
                            traveller.name
                        }
                    </Text>

                </View>

                <View
                    style={
                        styles.card
                    }
                >

                    <Text
                        style={
                            styles.title
                        }
                    >
                        Current Location
                    </Text>

                    <Text>
                        Latitude:
                        {
                            traveller
                                .latitude
                                .toFixed(6)
                        }
                    </Text>

                    <Text>
                        Longitude:
                        {
                            traveller
                                .longitude
                                .toFixed(6)
                        }
                    </Text>

                </View>

                <View
                    style={
                        styles.card
                    }
                >

                    <Text
                        style={
                            styles.title
                        }
                    >
                        Journey Info
                    </Text>

                    <Text>
                        Speed:
                        {
                            traveller.speed
                        }
                        km/hr
                    </Text>

                    <Text>
                        Battery:
                        {
                            traveller.battery
                        }
                        %
                    </Text>

                    <Text>
                        Updated:
                        {
                            traveller.lastUpdate
                        }
                    </Text>

                </View>

                <View
                    style={
                        styles.actions
                    }
                >

                    <TouchableOpacity
                        style={
                            styles.callButton
                        }
                    >

                        <Text
                            style={
                                styles.buttonText
                            }
                        >
                            CALL
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={
                            styles.alertButton
                        }
                    >

                        <Text
                            style={
                                styles.buttonText
                            }
                        >
                            ALERT
                        </Text>

                    </TouchableOpacity>

                </View>

            </ScrollView>

        </View>

    );

}

const styles =
StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:
            COLORS.background
    },

    loading: {
        flex: 1,
        justifyContent:
            'center',
        alignItems:
            'center'
    },

    header: {

        paddingTop: 55,

        paddingBottom: 15,

        backgroundColor:
            COLORS.white
    },

    headerTitle: {

        fontSize: 22,

        fontWeight: '700',

        textAlign: 'center'
    },

    mapContainer: {

        flex: 1
    },

    bottomSheet: {

        backgroundColor:
            COLORS.white,

        borderTopLeftRadius: 25,

        borderTopRightRadius: 25,

        padding: 20,

        maxHeight: 350
    },

    statusRow: {

        flexDirection:
            'row',

        justifyContent:
            'space-between',

        marginBottom: 20
    },

    live: {

        color:
            COLORS.success,

        fontWeight: '700'
    },

    card: {

        backgroundColor:
            '#F8FAFC',

        padding: 15,

        borderRadius: 15,

        marginBottom: 15
    },

    title: {

        fontWeight: '700',

        marginBottom: 8
    },

    actions: {

        flexDirection:
            'row',

        justifyContent:
            'space-between',

        marginTop: 10
    },

    callButton: {

        backgroundColor:
            COLORS.primary,

        padding: 18,

        borderRadius: 15,

        width: '48%',

        alignItems: 'center'
    },

    alertButton: {

        backgroundColor:
            COLORS.danger,

        padding: 18,

        borderRadius: 15,

        width: '48%',

        alignItems: 'center'
    },

    buttonText: {

        color: 'white',

        fontWeight: '700'
    }

});