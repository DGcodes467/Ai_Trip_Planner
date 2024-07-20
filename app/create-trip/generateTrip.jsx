import {View,Text,Image} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { CreateTripContext } from '../../context/CreateTripContext'
import { AI_PROMPT } from '../../constants/options';
import { chatSession } from '../../configs/GeminiConfig';
import { useRouter } from 'expo-router';
import {setDoc,doc} from 'firebase/firestore'
import {auth,db} from './../../configs/FirebaseConfig'
export default function GenerateTrip(){
    const {tripData,setTripData}=useContext(CreateTripContext);
    const [loading,setLoading]=useState(false)
    const router=useRouter()
    const user=auth.currentUser;
    useEffect(()=>{
        generateTripfun()
    },[])
    const generateTripfun=async()=>{
        setLoading(true);
        const FINAL_PROMPT=AI_PROMPT.replace('{location}',tripData.locationInfo?.name)
        .replace('{totalDay}',tripData.totalNumberOfDays)
        .replace('{totalNight}',tripData.totalNumberOfDays-1)
        .replace('{traveller}',tripData?.traveller?.title)
        .replace('{budget}',tripData?.budget)
        .replace('{totalDay}',tripData.totalNumberOfDays)
        .replace('{totalNight}',tripData.totalNumberOfDays-1);

        console.log(FINAL_PROMPT);
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result.response.text());
        const docId=(Date.now()).toString();
        const tripResponse=JSON.parse(result.response.text());
        setLoading(false);
        const result2 = await setDoc(doc(db,"UserTrips",docId),{
            UserEmail:user.email,
            GeminiResponse:tripResponse,
            tripData:JSON.stringify(tripData),
            docId:docId
        });
        console.log(loading)
        router.push('/(tabs)/mytrip')
    }
    return(
        <View style={{
            padding:25,
            paddingTop:75,
            backgroundColor:'#fff',
            height:'100%'
        }}>
            <Text style={{fontFamily:'outfit-medium',fontSize:26,}}>Please Hold On ...</Text>
            <Text style={{fontFamily:'outfit',fontSize:17}}>we are generating the best trip for you.</Text>

            <Image source={require('./../../assets/images/ttfinal.gif')}
            style={{
                width:'100%',
                objectFit:'contain'
            }}/>
        </View>
    )
}