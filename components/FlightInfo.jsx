import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';

const FlightInfo = ({ flightData }) => {
    // Check if flightData exists and if it has the expected structure
    if (!flightData || !flightData.travel_mode || !flightData.travel_mode.flight || !flightData.travel_mode.flight.airline) {
        return (
            <View style={{ }}>
                <Text>Loading flight information...</Text>
            </View>
        );
    }
    //console.log(flightData.accommodation.hotel_options)
    return (
        <View style={{ marginTop:17,}}>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',borderWidth:1,padding:10,borderRadius:15,borderColor:'lightgray'}}>
            <View>
            <Text style={{fontFamily:'outfit-bold',fontSize:21}}>✈️ Flights</Text>
            <Text style={{ fontSize: 17,fontFamily:'outfit',marginTop:3}}>Airline : {flightData.travel_mode.flight.airline}</Text>
            <Text style={{ fontSize: 17,fontFamily:'outfit',marginTop:3}}>Price : {flightData.travel_mode.flight.price}</Text>
            {/* <Text style={{ fontSize: 17,fontFamily:'outfit',marginTop:3}}>Price : {flightData.accommodation.hotel_options.hotel_name}</Text> */}
            </View>
            <TouchableOpacity style={{
                backgroundColor:'blue',
                padding:10,
                width:100,
                borderRadius:7,marginTop:3
            }}>
                <Text style={{color:'white',textAlign:'center',fontFamily:'outfit'}}>Book Now</Text>
            </TouchableOpacity>
            </View>
            {/* Add other flight information as needed */}
        </View>
    );
};

export default FlightInfo;
