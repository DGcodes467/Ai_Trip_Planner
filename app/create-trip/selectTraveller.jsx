import {View,Text,FlatList, TouchableOpacity} from 'react-native'

import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import OptionCard from '../../components/Option_card'
import { selectTravellerList } from '../../constants/options'
import Button from '../../components/Button'
import { CreateTripContext } from '../../context/CreateTripContext'
export default function SelectTraveller(){

    const navigation=useNavigation();
    const [selectedTraveller,setSelectedTraveller]=useState();
    const {tripData,setTripData}=useContext(CreateTripContext);

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:''
        })
    },[])

    useEffect(()=>{
        setTripData({...tripData,
            traveller:selectedTraveller
        })
    },[selectedTraveller]);

    useEffect(()=>{
        console.log(tripData);
    },[tripData]);
    return(
        <View style={{backgroundColor:'white',padding:25,height:'100%',paddingTop:75}}>
            <Text style={{
                fontSize:30,
                fontFamily:'outfit-bold',
                marginTop:20
            }}>Who's Travelling</Text>
            
   
            <View>
                <Text style={{
                    fontFamily:'outfit-medium',fontSize:20,marginTop:30
                }}>Choose Your travellers.</Text>
              
              <FlatList data={selectTravellerList}
              renderItem={({item,index})=>(
                <TouchableOpacity onPress={()=>{
                    setSelectedTraveller(item);
                }} style={{marginVertical:10}}>
                    <OptionCard option={item} selectedOption={selectedTraveller}/>
                </TouchableOpacity>
            )}/>
               
            </View>
            {selectedTraveller &&
            <Button name='Continue' path={'/create-trip/SelectDate'}/>
            }
        </View>
        
    )
}
