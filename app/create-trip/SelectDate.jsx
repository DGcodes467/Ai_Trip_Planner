import {Text,TouchableOpacity,View,StyleSheet} from 'react-native'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { Colors } from '@/constants/Colors'
import { useNavigation, useRouter } from 'expo-router';
import CalendarPicker from 'react-native-calendar-picker'
import Button from '../../components/Button';
import moment from 'moment'
import { CreateTripContext } from '../../context/CreateTripContext';
export default function SelectDate(){
    const navigation=useNavigation();
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:''
        })
    },[])
    const router=useRouter();
    const [startDate,setStartDate]=useState();
    const [endDate,setEndDate]=useState();
    const {tripData,setTripData}=useContext(CreateTripContext);

    const onDateChange=(date,type)=>{
        console.log(date,type);
        if(type=='START_DATE'){
            setStartDate(moment(date));
        }else{
            setEndDate(moment(date));
        }
    }
    const onDateSelection=()=>{
       
        const totalNumberOfDays=endDate.diff(startDate,'days');
        
        console.log(totalNumberOfDays+1)
        setTripData({
            ...tripData,
            startDate:startDate,
            endDate:endDate,
            totalNumberOfDays:totalNumberOfDays+1
        });
        router.push('/create-trip/selectBudget')
    }
    return(
        <View style={{
            padding:25,
            paddingTop:75,
            backgroundColor:'#fff',
            height:'100%'
        }}>

        <Text style={{fontFamily:'outfit-medium',fontSize:25,marginTop:30}}>Pick your</Text>
        <Text style={{fontFamily:'outfit-bold',fontSize:30}}>Travel dates 🗓️.</Text>
        <View style={{marginTop:25,}}>
        <CalendarPicker onDateChange={onDateChange} allowRangeSelection={true} 
        minDate={new Date()} maxRangeDuration={7} 
        selectedRangeStyle={{ backgroundColor:'orangered',color:'white'}}
        selectedDayTextStyle={{color:'white'}}
    
        />
        </View>
        {(startDate && endDate) &&
        
        <View>
        <TouchableOpacity style={[styles.button] } onPress={onDateSelection}>
               <Text style={{color:'white',fontFamily:'outfit-medium',fontSize:20,textAlign:'center'}}>Continue</Text>
           </TouchableOpacity>
      </View>
        }
        </View>
    )
}


const styles=StyleSheet.create({

    button:{
       padding:15,
       backgroundColor:Colors.PRIMARY,
       borderRadius:99,
       marginTop:'20%',
    },
    buttonText:{
        color:Colors.WHITE,
        textAlign:'center',
        fontFamily:'outfit',
        fontSize:20
    }

});

