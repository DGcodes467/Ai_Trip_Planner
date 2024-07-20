import {View,Text,Image,StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { GetPhotoRef } from '../app/services/GetGoogleMapRef';
import { useEffect } from 'react';

export default function HotelImg({hotel}){
    const[photoRef,setPhotoRef]=useState();
    useEffect(() => {
        fetchGooglePhotoRef();
    }, []);
    const fetchGooglePhotoRef = async () => {
       
            console.log("Fetching photo ref for location: Las Vegas, USA");
            const result = await GetPhotoRef(hotel.hotel_name);
            setPhotoRef(result?.results[0]?.photos[0]?.photo_reference)
          
       
    };
    console.log("Received result:",photoRef);
    return(
        <View style={{marginTop:7,borderWidth:1,borderRadius:15,borderColor:'lightgray',padding:5}}>
        <Image source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+photoRef+'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
   style={styles.image} />
        <Text style={styles.title}>{hotel.hotel_name}</Text>
        <Text style={styles.description}>{hotel.description}</Text>
        <Text style={styles.address}><Text style={{fontFamily:'outfit-medium',color:'black'}}>Address</Text> : {hotel.hotel_address}</Text>
        <Text style={styles.price}>Price : {hotel.price}</Text>
        <Text style={styles.ratings}>Rating : {hotel.ratings}⭐</Text>
      
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
   
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        resizeMode: 'cover',
        borderRadius:15
    },
    title: {
        fontSize: 20,
        marginBottom: 5,
        fontFamily:'outfit-medium'
    },
    description: {
       fontFamily:'outfit',
        marginBottom: 5,
        color:'gray'
    },
    address: {
        fontFamily:'outfit',
        marginBottom: 5,
        color:'gray'
    },
    price: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    ratings: {
        color: 'orange',
    },
});
