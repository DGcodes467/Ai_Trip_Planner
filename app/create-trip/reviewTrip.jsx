import { Text,View,StyleSheet } from "react-native";
import React,{useContext, useEffect, useReducer} from 'react'
import { useNavigation } from "expo-router";
import moment from "moment";
import  {CreateTripContext}  from "../../context/CreateTripContext";
import Button from "../../components/Button";
import { useRouter } from "expo-router";

export default function reviewTrip(){
const {tripData,setTripData}=useContext(CreateTripContext)
const router=useRouter();
const navigation=useNavigation()
useEffect(()=>{
    navigation.setOptions({
        headerShown:true,
        headerTransparent:true,
        headerTitle:''
    })
},[])


    return(
        <View style={{
            padding:25,
            paddingTop:75,
            backgroundColor:'#fff',
            height:'100%'
        }}>
        <Text style={{fontFamily:'outfit-bold',fontSize:30,marginTop:30}}>Review your Trip</Text>
       
       
        <Text style={{fontFamily:'outfit-medium',fontSize:20,color:'gray',marginBottom:45}}>Before genearing your trip, please review your selections.</Text>
      {/* Destinatin */}
      <View style={{borderWidth:1,borderRadius:15,backgroundColor:'aliceblue',padding:10,borderColor:'gray'}}>
        <View style={styles.reviewDiv}>
            {/* <Ionicons name="location-sharp" size={32} color="black"/> */}
        <Text style={{fontSize:30}}>📍</Text>
       

        <View>
            <Text style={styles.reviewHead}>Destination</Text>
            <Text style={styles.reviewData}>Undefined</Text>
        </View>
        </View>


          {/* Travel Dates */}
          <View style={styles.reviewDiv}>
            {/* <Ionicons name="location-sharp" size={32} color="black"/> */}
        <Text style={{fontSize:30}}>🗓️</Text>
       

        <View>
            <Text style={styles.reviewHead}>Travel Dates</Text>
            <Text style={styles.reviewData}>{moment(tripData?.startDate).format('DD MMM')+" To "+moment(tripData.endDate).format('DD MMM')} | ({tripData.totalNumberOfDays} days)</Text>
        </View>
        </View>

           {/* Traveller */}
           <View style={styles.reviewDiv}>
        <Text style={{fontSize:30}}>🚌</Text>
        

        <View>
            <Text style={styles.reviewHead}>Travellers</Text>
            <Text style={styles.reviewData}>{tripData?.traveller?.title}</Text>
        </View>
        </View>

        
           {/* Budget */}
           <View style={styles.reviewDiv}>
        <Text style={{fontSize:30}}>💰</Text>
        

        <View>
            <Text style={styles.reviewHead}>Budget</Text>
            <Text style={styles.reviewData}>{tripData?.budget}</Text>
        </View>
        </View>
        </View>
        <Button name="Generate my Trip" path={'/create-trip/generateTrip'}/>
        
        </View>
    )
}


const styles=StyleSheet.create({
    reviewDiv:{
        marginTop:20,
        display:'flex',
        flexDirection:'row',
        gap:20,
        
    },

    reviewHead:{
        fontFamily:'outfit',fontSize:20,color:'gray'
    },
    reviewData:{
        fontFamily:'outfit-medium',fontSize:20
    }

})
