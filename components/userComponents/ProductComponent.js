import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import LoadingComponent from '../LoadingComponent';
import { API_URL } from '../../Globals';
import {
    useFonts,
    Bangers_400Regular
} from '@expo-google-fonts/dev';

export default function ProductComponent({ productId, deleteProduct, showDialog, user, pushTransaction }) {
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState({});
    const [btnText, setBtnText] = useState('POROSIT PRODUKTIN');
    const [ordering, setOrdering] = useState(false);
    let [fontsLoaded] = useFonts({
        Bangers_400Regular
    });

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL}products/${productId}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data.product);
                setIsLoading(false);
            })
    }, [productId]);

    const submitClicked = () => {
        if(!ordering) {
            setOrdering(true);
            setBtnText('DUKE U POROSITUR');
            fetch(`${API_URL}transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ product_id: productId, donor_username: product.donor_username, user_id: user._id })
            }) 
                .then(res => res.json())
                .then(data => {
                    if(data.status) {
                        deleteProduct();
                        pushTransaction(product.header);
                        showDialog('Sukses', 'Produkti u porosit me sukses. Kontrollo email-in per me shume informacion.');
                    }
                });
        }
    }

    if(isLoading || !fontsLoaded)
        return <LoadingComponent />

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{product.header}</Text>
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.info}>
                    <Text style={styles.infoText}>Pershkrimi: {product.description}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoText}>Donatori: {product.donor_username}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoText}>Sasia: {product.quantity}</Text>
                </View>
                <TouchableOpacity onPress={() => submitClicked()} style={{...styles.btn, marginBottom: 0, backgroundColor: '#5887ff'}}>
                    <Text style={styles.btnText}>{btnText}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8f1f2',
        flex: 1,
        padding: 20
    },
    header: {
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#102e4a'
    },
    headerText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Bangers_400Regular'
    },
    info: {
        flex: 1,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 6,
        marginTop: 6, 
        marginBottom: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 6.00,
        elevation: 3
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