import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Dialog from "react-native-dialog";
import { API_URL } from '../../Globals';

export default function HomeComponent({ donor, pushProduct }) {
    const [header, setHeader] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [dialogText, setDialogText] = useState('');
    const [dialogHeader, setDialogHeader] = useState('');
    const [btnText, setBtnText] = useState('SHTO');

    const addProduct = () => {
        if(/\S/.test(header) && /\S/.test(description) && parseInt(quantity) > 0) {
            setBtnText('DUKE U SHTUAR');
            fetch(`${API_URL}products/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ header, description, quantity, donor_username: donor.username })
            })
                .then(res => res.json())
                .then(data => {
                    setBtnText('SHTO');
                    if(data.status) {
                        setIsDialogVisible(true);
                        setDialogHeader('Sukses');
                        setDialogText('Produkti u shtua me sukses.');
                        pushProduct(data.product);
                        setHeader('');
                        setDescription('');
                        setQuantity('');
                    } else {
                        setIsDialogVisible(true);
                        setDialogHeader('Error');
                        setDialogText('Ju lutem vendosni sakt te dhenat e kerkuara.');
                    }
                });
        } else {
            setIsDialogVisible(true);
            setDialogHeader('Error');
            setDialogText('Ju lutem vendosni sakt te dhenat e kerkuara.');
        }
    }

    return (
        <View style={styles.container}>
            <Dialog.Container visible={isDialogVisible}>
                <Dialog.Title>{dialogHeader}</Dialog.Title>
                <Dialog.Description>{dialogText}</Dialog.Description>
                <Dialog.Button label="Ok" onPress={() => setIsDialogVisible(false)} />
            </Dialog.Container>
            <View style={{marginTop: 0, marginBottom: 7}}>
                <Text style={{marginBottom: 3, fontSize: 16, fontWeight: 'bold'}}>Titulli:</Text>
                <TextInput
                    style={styles.textInput}
                    value={header}
                    onChangeText={t => setHeader(t)}
                />
            </View>
            <View style={{marginTop: 7, marginBottom: 7}}>
                <Text style={{marginBottom: 3, fontSize: 16, fontWeight: 'bold'}}>Pershkrimi:</Text>
                <TextInput
                    multiline={true}
                    numberOfLines={3}
                    style={styles.textInput}
                    value={description}
                    onChangeText={t => setDescription(t)}
                />
            </View>
            <View style={{marginTop: 7, marginBottom: 7}}>
                <Text style={{marginBottom: 3, fontSize: 16, fontWeight: 'bold'}}>Sasia:</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType='numeric'
                    value={quantity}
                    onChangeText={t => setQuantity(t)}
                />
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => addProduct()}>
                <Text style={styles.btnText}>{btnText}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    textInput: {
        flex: 1,
        padding: 6,
        backgroundColor: 'white',
        borderRadius: 6,
        fontSize: 16,
    },
    btn: {
        width: "100%",
        padding: 12,
        marginTop: 12,
        marginBottom: 12,
        borderRadius: 6,
        backgroundColor: '#5887ff',
        display: 'flex',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 3
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1
    }
});