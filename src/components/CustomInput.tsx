import React from 'react';

import {
    TextInput,
    StyleSheet
} from 'react-native';

import { COLORS } from '../theme/colors';

export default function CustomInput(
    props: any
) {

    return (
        <TextInput
            {...props}
            style={styles.input}
        />
    );
}

const styles = StyleSheet.create({

    input: {

        backgroundColor:
            COLORS.white,

        borderWidth: 1,

        borderColor:
            COLORS.border,

        borderRadius: 14,

        padding: 16,

        marginBottom: 16
    }

});