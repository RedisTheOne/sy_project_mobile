import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import ProductComponent from './ProductComponent';
import Dialog from "react-native-dialog";

export default function HomeComponent({ products, filterProducts, user, pushTransaction }) {
    const [productVisible, setProductVisible] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogBody, setDialogBody] = useState('');

    const deleteProduct = () => {
        filterProducts(selectedProductId);
        setProductVisible(false);
    }

    const showDialog = (title, body) => {
        setDialogBody(body);
        setDialogTitle(title);
        setIsDialogVisible(true);
    }

    return (
        <View style={styles.container}>
            <Dialog.Container visible={isDialogVisible}>
                <Dialog.Title>{dialogTitle}</Dialog.Title>
                <Dialog.Description>{dialogBody}</Dialog.Description>
                <Dialog.Button label="Ok" onPress={() => setIsDialogVisible(false)} />
            </Dialog.Container>
            <Modal
                animationType="slide"
                transparent={false}
                visible={productVisible}
                onRequestClose={() => setProductVisible(false)}
            >   
                <ProductComponent pushTransaction={(product_header) => pushTransaction(product_header)} user={user} showDialog={showDialog} deleteProduct={deleteProduct} productId={selectedProductId} />
            </Modal>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>PRODUKTET | {products.length}</Text>
            <View style={styles.products}>
                {products.map((p, i) => (
                    <TouchableOpacity onPress={() => {
                        setProductVisible(true);
                        setSelectedProductId(p._id);
                    }} key={i} style={styles.product}>
                        <Text style={styles.productText}>{p.header}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    products: {
        marginTop: 15,
        marginBottom: 15
    },
    product: {
        flex: 1,
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 3
    },
    productText: {
        fontSize: 17
    }
});