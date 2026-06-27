import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import { COLORS } from '../theme/colors';

export default function CustomButton({
    title,
    onPress,
    loading
}: any) {

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Text style={styles.text}>
                {
                    loading
                        ? 'Loading...'
                        : title
                }
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    button: {
        backgroundColor:
            COLORS.primary,

        padding: 16,

        borderRadius: 14,

        alignItems: 'center'
    },

    text: {
        color: COLORS.white,

        fontSize: 16,

        fontWeight: '600'
    }
});