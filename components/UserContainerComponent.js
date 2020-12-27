import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, AsyncStorage, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import {
    useFonts,
    Bangers_400Regular
} from '@expo-google-fonts/dev';
import { API_URL } from '../Globals';
import LoadingComponent from './LoadingComponent';
import ProfileComponent from './userComponents/ProfileComponent';
import HomeComponent from './userComponents/HomeComponent';
import TransactionsComponent from './userComponents/TransactionsComponent';

export default function UserContainer({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const [products, setProducts] = useState([]);
    const [isHomeActive, setIsHomeActive] = useState(true);
    const [isOrdersActive, setIsOrdersActive] = useState(false);
    const [isProfileActive, setIsProfileActive] = useState(false);
    const [transactions, setTransactions] = useState([]);

    //LOAD FONTS
    let [fontsLoaded] = useFonts({
        Bangers_400Regular
    });

    //SIGN OUT FUNCTIONS
    const _removeData = async () => {
        try {
          await AsyncStorage.removeItem('USER', async () => {
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

    const retrieveId = async () => {
        try {
            const value = await AsyncStorage.getItem('ID');
            if (value !== null)
                return value;
            return '';
        } catch (error) {}
    }

    const homeClicked = () => {
        setIsHomeActive(true);
        setIsProfileActive(false);
        setIsOrdersActive(false);
    }

    const profileClicked = () => {
        setIsHomeActive(false);
        setIsProfileActive(true);
        setIsOrdersActive(false);
    }

    const pushTransaction = (product_header) => {
        const newTransactions = transactions;
        transactions.unshift({ product_header, createdAt: new Date() });
        setTransactions(newTransactions);
    }

    const ordersClicked = () => {
        setIsHomeActive(false);
        setIsProfileActive(false);
        setIsOrdersActive(true);
    }

    const filterProducts = (productId) => {
        const newProducts = products.filter(p => p._id !== productId);
        setProducts(newProducts);
    }
    
    useEffect(() => {
        retrieveId()
            .then(id => {
                fetch(`${API_URL}users/${id}`)
                    .then(res => res.json())
                    .then(data => {
                        setUser(data.user);
                        setProducts(data.products);
                        setTransactions(data.transactions);
                        setIsLoading(false);
                    });
            })
    }, [])

    //DONT ALLOW TO GO BACK
    useEffect(() => navigation.addListener('beforeRemove', (e) => e.preventDefault()), []);

    if(isLoading || !fontsLoaded)
        return <LoadingComponent />

    return (
        <View style={{flex: 1}}>
            <StatusBar backgroundColor="#102e4a" barStyle={'light-content'} />
            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.headerText}>NE NEVOJE</Text>
            </View>
            {/* CONTAINERS */}
            <ScrollView style={{...styles.container, display: isHomeActive ? 'flex' : 'none'}}>
                <HomeComponent pushTransaction={pushTransaction} user={user} filterProducts={filterProducts} products={products} />
            </ScrollView>
            <ScrollView style={{...styles.container, display: isOrdersActive ? 'flex' : 'none'}}>
                <TransactionsComponent pushTransaction={pushTransaction} transactions={transactions} />
            </ScrollView>
            <ScrollView style={{...styles.container, display: isProfileActive ? 'flex' : 'none'}}>
                <ProfileComponent user={user} signOut={signOut} />
            </ScrollView>
            {/* BOTTOM BAR */}
            <View style={styles.bottomBar}>
                <TouchableOpacity onPress={() => homeClicked()} style={{backgroundColor: isHomeActive ? '#5887ff' : '#102e4a', padding: 15, flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Image
                        source={require('../assets/icons/home_icon.png')}
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