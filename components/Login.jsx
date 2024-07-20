import {View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import Button from './../components/Button'
import { AntDesign } from '@expo/vector-icons';
export default function Login(){
    const router=useRouter();
  return (
    <View>
        <Image source={require('./../assets/images/frontfinal.jpg')}
            style={{
                width:'100%',
                height:520,
                objectFit:'cover'
            }}
        />
        <View style={styles.container}>
            <Text style={{fontSize:30,fontFamily:'outfit-bold',textAlign:'center',marginTop:10}}>Ai Trip Planner</Text>
            <Text style={{
                fontFamily:'outfit',
                fontSize:17,
                textAlign:'center',
                color:'gray',
                marginTop:20
            }}
            >Discover your next adventure destination effortlessly. Planning your Trips at your fingertips.Travel smarter with AI-driven insights.</Text>
        
       <Button name="Get Started     " icon={<AntDesign name="arrowright" size={24} color="#fff" />} path='auth/sign-in' />
        
        </View>

    
    </View>
  )
}


const styles=StyleSheet.create({
    container:{
        backgroundColor:'ghostwhite',
        marginTop:-25,
        height:'100%',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:25,
    },

})


