import React, { useEffect, useState }  from 'react';
import { View, Text, AsyncStorage, StyleSheet, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { API_URL } from '../Globals';
import {
    useFonts,
    Bangers_400Regular
} from '@expo-google-fonts/dev';
import HomeComponent from './donorComponents/HomeComponent';
import UserComponent from './donorComponents/UserComponent';
import AddProductComponent from './donorComponents/AddProductComponent';
import LoadingComponent from './LoadingComponent';
import TransactionsComponent from './donorComponents/TransactionsComponent';

export default function DonorContainer({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);
    const [donor, setDonor] = useState({});
    const [products, setProducts] = useState([]);
    const [isHomeActive, setIsHomeActive] = useState(true);
    const [isAddProductActive, setIsAddProductActive] = useState(false);
    const [isProfileActive, setIsProfileActive] = useState(false);
    const [isOrdersActive, setIsOrdersActive] = useState(false);
    const [transactions, setTransactions] = useState([]);

    const homeClicked = () => {
        setIsHomeActive(true);
        setIsAddProductActive(false);
        setIsProfileActive(false);
        setIsOrdersActive(false);
    }

    const addProductClicked = () => {
        setIsHomeActive(false);
        setIsAddProductActive(true);
        setIsProfileActive(false);
        setIsOrdersActive(false);
    }

    const profileClicked = () => {
        setIsHomeActive(false);
        setIsAddProductActive(false);
        setIsProfileActive(true);
        setIsOrdersActive(false);
    }

    const ordersClicked = () => {
        setIsHomeActive(false);
        setIsAddProductActive(false);
        setIsProfileActive(false);
        setIsOrdersActive(true);
    }

    const pushProduct = (product) => {
        let newProducts = products;
        newProducts.unshift(product);
        setProducts(newProducts);
    }

    const filterProducts = (productId) => {
        const newProducts = products.filter(p => p._id !== productId);
        setProducts(newProducts);
    }

    const changeStatus = (productId) => {
        const newProducts = products.map(p => {
            if(p._id === productId) 
                p.status = !p.status;
            return p;
        });
        setProducts(newProducts);
    }

    //SIGN OUT FUNCTIONS
    const _removeData = async () => {
        try {
          await AsyncStorage.removeItem('DONOR', async () => {
            await AsyncStorage.removeItem('ID', () => {})
          })
        } catch(e) {}
    }
    const signOut = () => {
        _removeData()
            .then(() => {
                navigation.push('Home')
            });
    }

    //DONT ALLOW TO GO BACK
    useEffect(() => navigation.addListener('beforeRemove', (e) => e.preventDefault()), []);

    //LOAD FONTS
    let [fontsLoaded] = useFonts({
        Bangers_400Regular
    });

    const retrieveId = async () => {
        try {
            const value = await AsyncStorage.getItem('ID');
            if (value !== null)
                return value;
            return '';
        } catch (error) {}
    }

    useEffect(() => {
        retrieveId()
            .then(id => {
                fetch(`${API_URL}donors/${id}`)
                    .then(res => res.json())
                    .then(data => {
                        setDonor(data.donor);
                        setProducts(data.products);
                        setTransactions(data.transactions);
                        setIsLoading(false);
                    });
            })
    }, [])

    if(isLoading || !fontsLoaded)
        return <LoadingComponent />

    return (
        <View style={{flex: 1}}>
            <StatusBar backgroundColor="#102e4a" barStyle={'light-content'} />
            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.headerText}>DONATOR</Text>
            </View>
            {/* CONTAINERS */}
            <ScrollView style={{...styles.container, display: isHomeActive ? 'flex' : 'none'}}>
                <HomeComponent changeStatus={changeStatus} filterProducts={filterProducts} products={products} />
            </ScrollView>
            <ScrollView style={{...styles.container, display: isAddProductActive ? 'flex' : 'none'}}>
                <AddProductComponent pushProduct={pushProduct} donor={donor} />
            </ScrollView>
            <ScrollView style={{...styles.container, display: isOrdersActive ? 'flex' : 'none'}}>
                <TransactionsComponent transactions={transactions} />
            </ScrollView>
            <ScrollView style={{...styles.container, display: isProfileActive ? 'flex' : 'none'}}>
                <UserComponent donor={donor} signOut={signOut} />
            </ScrollView>
            {/* BOTTOM BAR */}
            <View style={styles.bottomBar}>
                <TouchableOpacity onPress={() => homeClicked()} style={{backgroundColor: isHomeActive ? '#5887ff' : '#102e4a', padding: 15, flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Image
                        source={require('../assets/icons/home_icon.png')}
                        style={{width: 30, height: 30}}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addProductClicked()} style={{backgroundColor: isAddProductActive ? '#5887ff' : '#102e4a', padding: 15, flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Image
                        source={require('../assets/icons/add_icon.png')}
                        style={{width: 30, height: 30}}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => ordersClicked()} style={{backgroundColor: isOrdersActive ? '#5887ff' : '#102e4a', padding: 15, flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Image
                        source={require('../assets/icons/orders_icon.png')}
                        style={{width: 30, height: 30}}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => profileClicked()} style={{backgroundColor: isProfileActive ? '#5887ff' : '#102e4a', padding: 15, flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Image
                        source={require('../assets/icons/user_icon.png')}
                        style={{width: 30, height: 30}}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8f1f2',
        flex: 1
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
    bottomBar: {
        backgroundColor: '#102e4a',
        display: 'flex',
        flexDirection: 'row'
    }
})