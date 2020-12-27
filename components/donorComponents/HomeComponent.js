import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import ProductComponent from './ProductComponent';

export default function HomeComponent({ products, filterProducts, changeStatus }) {
    const [productVisible, setProductVisible] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState('');

    const deleteProduct = () => {
        filterProducts(selectedProductId);
        setProductVisible(false);
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={productVisible}
                onRequestClose={() => setProductVisible(false)}
            >   
                <ProductComponent changeProductStatus={() => changeStatus(selectedProductId)} deleteProduct={deleteProduct} productId={selectedProductId} />
            </Modal>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>PRODUKTET E MIA | {products.length}</Text>
            <View style={styles.products}>
                {products.map((p, i) => (
                    <TouchableOpacity onPress={() => {
                        setProductVisible(true);
                        setSelectedProductId(p._id);
                    }} key={i} style={{...styles.product, backgroundColor: p.status ? '#3a5311' : 'red'}}>
                        <Text style={{...styles.productText, color: 'white'}}>{p.header}</Text>
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