import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import {
    useFonts,
    Oswald_500Medium
} from '@expo-google-fonts/dev';
import Dialog from "react-native-dialog";
import { API_URL } from '../Globals';

export default function NNNSignInComponent({ navigation }) {
    //LOAD FONTS
    let [fontsLoaded] = useFonts({
        Oswald_500Medium
    });

    const _storeData = async (id) => {
        try {
            await AsyncStorage.setItem('ID', id);
            await AsyncStorage.setItem('USER', 'true');
        } catch (error) {}
    };

    //VARIABLES
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');

    const btnPressed = () => {
        fetch(`${API_URL}users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({number, password})
        })
            .then(res => res.json())
            .then(data => {
                if(data.status) {
                    //SUCCESS
                    _storeData(data.id)
                        .then(() => navigation.push('UserContainer'));
                } else
                    setIsDialogVisible(true);
            })
            .catch(err => setIsDialogVisible(true));
    }

    //CHECK IF THE FONTS ARE LOADED
    if(!fontsLoaded)
        return <View></View>
        

    return (
        <View style={styles.container}>
            <Dialog.Container visible={isDialogVisible}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Description>
                        Te dhenat e futura jane te pasakta.
                    </Dialog.Description>
                    <Dialog.Button label="Ok" onPress={() => setIsDialogVisible(false)} />
            </Dialog.Container>
            <Text style={{ color: 'white', fontFamily: 'Oswald_500Medium', fontSize: 30 }}>INDETIFIKOHU</Text>
            <TextInput
                value={number}
                onChangeText={(t) => setNumber(t)}
                autoCapitalize={"none"}
                placeholder='Numri llogarise:'
                style={styles.txtInput}
            />
            <TextInput
                value={password}
                onChangeText={(t) => setPassword(t)}
                autoCapitalize={"none"}
                secureTextEntry={true}
                placeholder='Kodi:'
                style={styles.txtInput}
            />
            <TouchableOpacity onPress={() => btnPressed()} style={styles.btn}>
                <Text style={styles.btnText}>HYR</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#102e4a',
      alignItems: 'center',
      justifyContent: 'center'
    },
    btn: {
      width: "80%",
      padding: 12,
      marginTop: 6,
      marginBottom: 6,
      borderRadius: 6,
      backgroundColor: '#5887ff'
    },
    btnText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    txtInput: {
        width: '80%',
        backgroundColor: '#e8f1f2',
        borderRadius: 6,
        padding: 8,
        marginTop: 6,
        marginBottom: 6,
        fontSize: 16
    }
});
  