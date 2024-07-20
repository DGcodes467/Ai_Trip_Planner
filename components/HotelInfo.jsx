import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'; // Import necessary components
import { GetPhotoRef } from '../app/services/GetGoogleMapRef';
import HotelImg from './HotelImg';

const HotelInfo = ({ hotelinfo }) => {
    
   
  
    // Check if hotelinfo is provided and if hotel_options array exists
    if (!hotelinfo || !hotelinfo.length) {
        return (
            <View style={styles.container}>
                <Text>Loading hotel information...</Text>
            </View>
        );
    }

    
    return (
        <View style={{marginTop:15,}}>
            <Text style={{fontFamily:'outfit-bold',fontSize:21,marginBottom:15,}}>🏩Hotel Recommendation</Text>
            {hotelinfo.map((hotel, index) => (
               <HotelImg hotel={hotel}/>
            ))}
            
        
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
   
    
});

export default HotelInfo;
