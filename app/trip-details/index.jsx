import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState,TouchableOpacity } from 'react';
import { Text, View, Image,ScrollView, FlatList} from 'react-native';
import moment from 'moment'
import HotelInfo from '../../components/HotelInfo';
import FlightInfo from '../../components/FlightInfo';
import PlannedTrips from '../../components/PlannedTrips';
export default function TripDetails() {
   
    const formatData=(data)=>{
        return JSON.parse(data)
    }
    const navigation = useNavigation();
    const { trip } = useLocalSearchParams();
    const [tripDetails, setTripDetails] = useState([]);
    const [flightData,setFlightData]=useState()
    const [photoref,setPhotoref]=useState();
    let ll;
    const [location,setLocation]=useState()
    const [startD,setStartD]=useState()
    const [endD,setEndD]=useState()
    const [traveller,setTraveller]=useState()
    const [hotel,setHotel]=useState()
     const [plan,setPlan]=useState()
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        });
        let parsedTrip = JSON.parse(trip);
        setTripDetails(parsedTrip)
        
        //let tripdataparsed=JSON.parse(parsedTrip.tripData)
       
        let trpd=parsedTrip.tripData
        
        
        ll=JSON.parse(trpd)
        //console.log(ll.locationInfo.photoRef)
        setPhotoref(ll.locationInfo.photoRef)
       // let lprsd=JSON.parse(trpd.location)
        // let locationparsed=JSON.parse(tripdataparsed.locationInfo)
        // setTripDetails(locationparsed.photoRef);
        setLocation(ll.locationInfo.name)
        setStartD(moment(ll.startDate).format('DD MMM yyy'))
        setEndD(moment(ll.endDate).format('DD MMM yyy'))
        setTraveller(ll.traveller.icon+ll.traveller.title)
        //let flightd=JSON.parse(tripDetails.GeminiResponse)
        setFlightData(parsedTrip.GeminiResponse.trip)
       //console.log(tripDetails)
      setHotel(parsedTrip.GeminiResponse.trip.accommodation.hotel_options)
      
    //    console.log(hotel)
    }, []);
    //console.log(flightData.daily_plan)
   
    return (
        <ScrollView>
           <Image source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+photoref+'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
              style={{width:'100%',height:330,objectFit:'cover',borderRadius:15}}
          />
          
          <ScrollView style={{marginTop:-30,}}>
          <View style={{padding:15,backgroundColor:'white',borderTopLeftRadius:30,borderTopRightRadius:30,height:'100%'}}>
            <Text style={{fontSize:25,fontFamily:'outfit-bold',}}>
                {location}
               
            </Text>
        <View style={{display:'flex',flexDirection:'row'}}>
            <Text style={{fontFamily:'outfit',color:'gray',fontSize:18}}>{startD}</Text>
            <Text style={{fontFamily:'outfit',color:'gray',fontSize:18}}> - {endD}</Text>
           
        </View>
        <Text style={{fontFamily:'outfit',fontSize:17,color:'gray'}}>{traveller}</Text>

        {/* flight info */}
        <FlightInfo flightData={flightData}/>
        {/* hotels info */}

        <PlannedTrips plan={flightData}/>
        
        <HotelInfo hotelinfo={hotel}/>
        {/* day trip plans */}
        
          </View>
          </ScrollView>

            
          
        </ScrollView>
    );
}
