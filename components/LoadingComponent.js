import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingComponent() {
    return (
        <View style={styles.loading}>
            <Text style={styles.loadingText}>LOADING...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: '#102e4a',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
});