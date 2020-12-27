import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import {
  useFonts,
  Oswald_500Medium
} from '@expo-google-fonts/dev';
import UserIcon from '../assets/icons/user_icon.png';
import DonorIcon from '../assets/icons/donor_icon.png';

export default function HomeComponent({ navigation }) {
  //LOAD FONTS
  let [fontsLoaded] = useFonts({
    Oswald_500Medium
  });

  //CHECK IF USER IS LOGGED IN
  const _retrieveUser = async () => {
    try {
      const value = await AsyncStorage.getItem('USER');
      if (value !== null)
        return value;
      return '';
    } catch (error) {}
  };

  const _retrieveDonor = async () => {
    try {
      const value = await AsyncStorage.getItem('DONOR');
      if (value !== null)
        return value;
      return '';
    } catch (error) {}
  }; 

  useEffect(() => {
    _retrieveUser()
      .then(userData => {
        if(userData === 'true')
          navigation.push('UserContainer');
        else {
          _retrieveDonor()
            .then(donorData => {
              if(donorData === 'true')
                navigation.push('DonorContainer');
            })
        }
      })
  }, []);

  //CHECK IF THE FONTS ARE LOADED
  if(!fontsLoaded)
    return <View></View>

  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', fontFamily: 'Oswald_500Medium', fontSize: 30 }}>Indetifikohu si:</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.push('NNNSignIn')}>
        <Image
          source={UserIcon}
          style={{width: 30, height: 30}}
        />
        <View style={styles.btnTextView}>
          <Text style={styles.btnText}>NE NEVOJE</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.push('DonatorSignIn')}>
        <Image
            source={DonorIcon}
            style={{width: 30, height: 30}}
        />
        <View style={styles.btnTextView}>
          <Text style={styles.btnText}>DONATOR</Text>
        </View>
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
    backgroundColor: '#5887ff',
    display: 'flex',
    flexDirection: 'row'
  },
  btnTextView: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 8
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
