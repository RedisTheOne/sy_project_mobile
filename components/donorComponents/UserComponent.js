import React from 'react';
import { View, TouchableOpacity, AsyncStorage, StyleSheet, Text } from 'react-native';

export default function UserComponent({ donor, signOut }) {
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>INFORMACION</Text>
            <View style={{...styles.info,  marginTop: 15}}>
                <Text style={styles.infoText}>Emri: {donor.name}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.infoText}>Mbiemri: {donor.surname}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.infoText}>Username: {donor.username}</Text>
            </View>
            <View style={{...styles.info}}>
                <Text style={styles.infoText}>Adresa: {donor.address}</Text>
            </View>
            <View style={{...styles.info}}>
                <Text style={styles.infoText}>Numri: {donor.phone_number}</Text>
            </View>
            <View style={{...styles.info,  marginBottom: 16}}>
                <Text style={styles.infoText}>Email: {donor.email}</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => signOut()}>
                <Text style={styles.btnText}>DIL NGA LLOGARIA</Text>
            </TouchableOpacity>
        </View>
    )
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
    },
    btn: {
        width: "100%",
        padding: 12,
        marginTop: 12,
        marginBottom: 12,
        borderRadius: 6,
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 5
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1
    }
});