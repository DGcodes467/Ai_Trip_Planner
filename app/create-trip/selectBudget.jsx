import {View,Text,FlatList,TouchableOpacity} from 'react-native'
import { useNavigation } from 'expo-router';
import React,{useContext, useEffect, useState} from 'react'
import OptionCard from '../../components/Option_card';
import { selectBudgetOptions } from '../../constants/options';
import { CreateTripContext } from '../../context/CreateTripContext';
import Button from '../../components/Button';
export default function SelectBudget(){
    const navigation=useNavigation();
    const [selectedBudget,setSelectedBudget]=useState();
    const {tripData,setTripData}=useContext(CreateTripContext)
    
    useEffect(()=>{
        setTripData({
            ...tripData,
            budget:selectedBudget?.title
        })
    },[selectedBudget])
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

        <Text style={{fontFamily:'outfit-medium',fontSize:25,marginTop:30}}>Pick your</Text>
        <Text style={{fontFamily:'outfit-bold',fontSize:30}}>Travel Budget 🤑.</Text>

        <View>
        <FlatList data={selectBudgetOptions}
              renderItem={({item,index})=>(
                <TouchableOpacity onPress={()=>{
                    setSelectedBudget(item);
                }} style={{marginVertical:10}}>
                    <OptionCard option={item} selectedOption={selectedBudget}/>
                </TouchableOpacity>
            )}/>
        </View>

        {selectedBudget && <Button name="Continue" path={'/create-trip/reviewTrip'}/>
        
        }
        </View>
    )
}