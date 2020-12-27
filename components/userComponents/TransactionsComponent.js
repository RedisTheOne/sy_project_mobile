import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function TransactionsComponent({ transactions }) {
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>POROSITE E MIA | {transactions.length}</Text>
            {transactions.map((t, i) => {
                const date = new Date(t.createdAt);
                return (
                    <View key={i} style={{...styles.info,  marginTop: 15}}>
                        <Text style={{...styles.infoText, fontWeight: 'bold'}}>
                            {t.product_header}
                        </Text>
                        <Text style={styles.infoText}>
                            Porositur ne date {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
                        </Text>
                    </View>
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    info: {
        flex: 1,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        marginTop: 6, 
        marginBottom: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 5
    },
    infoText: {
        fontSize: 15
    }
});