import { useNavigation, useRouter } from 'expo-router'
import { useContext, useEffect, useState } from 'react';
import {Text,StyleSheet,View, TouchableOpacity} from 'react-native'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import { Ionicons } from '@expo/vector-icons'; 
import { CreateTripContext } from '../context/CreateTripContext';

export default function SearchPlace() {
 
  const router=useRouter();
  // useEffect(()=>{
  //   navigation.setOptions({
  //     headerShown:true,
  //     headerTransparent:true,
  //     headerTitle:'Search'
  //   })
    
  // },[]);

  const {tripData,setTripData}=useContext(CreateTripContext)

  useEffect(()=>{
    console.log(tripData);
  }),[tripData]

    return (
   <View style={styles.search}>
    
      <GooglePlacesAutocomplete
        placeholder='Search your place...'
        fetchDetails={true}
       
        onPress={(data, details = null)=>{
           console.log(details.geometry.location);
           console.log(details?.url);
           console.log(details?.photos[0]?.photo_reference);
          setTripData({
            locationInfo:{
              name:data.description,
              coordinates:details?.geometry.location,
              photoRef:details?.photos[0]?.photo_reference,
              url:details?.url
            }
          });
          router.push('create-trip/selectTraveller')
          
        }}
        query={{
          key:process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
          language:'en',
        }}
        
        styles={{
          textInput:{
            borderRadius:10,
            marginTop:20,
            fontFamily:'outfit',
            height:50,
            shadowColor:'black',
    
          }
        }}
      
     />
   
    
     
   </View>
  )
}



const styles=StyleSheet.create({
search:{padding:25,paddingTop:10,height:'100%'}
})