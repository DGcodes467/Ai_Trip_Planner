import { router, useRouter } from 'expo-router';
import React, { useEffect,useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { GetPhotoRef } from '../app/services/GetGoogleMapRef';

const HomeCard = ({ photo, name, rating, location, entryFee }) => {

    const[photoRef,setPhotoRef]=useState();
    useEffect(() => {
        fetchGooglePhotoRef();
    }, [name]);
    const fetchGooglePhotoRef = async () => {
       
            //console.log("Fetching photo ref for location: Las Vegas, USA");
            const result = await GetPhotoRef(name);
            setPhotoRef(result?.results[0]?.photos[0]?.photo_reference)
          
       
    };
   // console.log("Received result:",photoRef);


    return (
        
        <TouchableOpacity style={styles.card} >
            <Image source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+photoRef+'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
   style={styles.image} />
            <View style={styles.details}>
            <View style={{width:'85%'}}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.location}>{location}</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>⭐{rating}</Text>
                    <Text style={styles.entryFee}>₹{entryFee}</Text>
             
                </View>
                
            </View>
        </TouchableOpacity>
        
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        marginTop:10,
        elevation: 3,
        marginBottom: 20,
        marginHorizontal: 15,
        width:300,
        height:250
        
    },
    image: {
        width: '100%',
        height:160,
      
        resizeMode: 'cover',
    },
    details: {
        padding: 15,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: 'col',
        alignItems: 'center',
        justifyContent:'center'
    },
    rating: {
        fontSize: 16,
        color: '#333',
    },
    location: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    entryFee: {
        fontSize: 14,
        color: '#666',
    },
});

export default HomeCard;
