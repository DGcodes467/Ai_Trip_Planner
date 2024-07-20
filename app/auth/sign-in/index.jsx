import {View,Text,Image,StyleSheet, TextInput, TouchableOpacity, ToastAndroid, KeyboardAvoidingView,} from 'react-native'
import {useNavigation, useRouter} from 'expo-router'
import{auth} from './../../../configs/FirebaseConfig'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Colors } from '@/constants/Colors'
import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button'
import { Ionicons } from '@expo/vector-icons';
export default function SignIn(){
  const navigation=useNavigation();
  const router=useRouter();

  const [email,setEmail]=useState();
  const [password,setPassword]=useState();

  useEffect(()=>{
    navigation.setOptions({headerShown:false})
  },[])

  const onSignIn=()=>{

    if(!email && !password){
      ToastAndroid.show("Please Enter Email & Password.",ToastAndroid.BOTTOM);
      return;
    };
    
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    
    const user = userCredential.user;
  
    router.replace('/mytrip')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    if(errorCode){
      ToastAndroid.show("Invalid Credentials",ToastAndroid.BOTTOM)
     console.log(errorMessage,errorCode)
     //console.log(email,password)
    }
  });
  }
  return (
    <View style={{padding:25,backgroundColor:Colors.WHITE,paddingTop:60,height:'100%'}}>
      <KeyboardAvoidingView behavior='padding'>
      <TouchableOpacity onPress={()=>router.back()}>
      <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{fontFamily:'outfit-bold', fontSize:30,marginTop:30}}>Let's Sign You In</Text>
        <Text style={{fontFamily:'outfit', fontSize:30,color:'gray',marginTop:20}}>
          Welcome Back</Text>
          <Text style={{fontFamily:'outfit', fontSize:30,color:'gray',marginTop:10}}>
          You'have been missed.</Text>
        {/* Gmail */}
        <View style={{marginTop:50}}>
          <Text style={{fontFamily:'outfit'}}>Gmail</Text>
          <TextInput  placeholder='Enter yor gmail' style={styles.input} onChangeText={(value)=>setEmail(value)}/>
        </View>
        {/* password */}
        <View style={{marginTop:20}}>
          <Text style={{fontFamily:'outfit'}}>Password</Text>
          <TextInput secureTextEntry={true} placeholder='Enter yor password' style={styles.input} onChangeText={(value)=>setPassword(value)}/>
        </View>
        {/* signin/signup button */}
        <View>
        <TouchableOpacity style={{backgroundColor:'black',padding:15,marginTop:'20%', borderRadius:15}} onPress={onSignIn}>
            <Text style={{fontSize:20,textAlign:'center',color:'#fff'}}>Sign In</Text>
        </TouchableOpacity>
        <Text style={{marginTop:20,textAlign:'center',fontSize:16}}>Don't have Account..?</Text>
        <Button name='Create Account' path='auth/sign-up' customStyle={styles.createAccountButton} customStyleText={styles.customStyleText}/>
        </View>
        </KeyboardAvoidingView> 
    </View>
  )}

  const styles=StyleSheet.create({
    input:{
      padding:15,
      borderWidth:1,
      borderRadius:15,
      borderColor:'gray',
      fontFamily:'outfit',
      fontSize:20
    },
    
    createAccountButton: {
      backgroundColor: 'white',
      borderWidth:1,
      borderColor:'gray',
      borderRadius:15,
      marginTop:0,
    },
    signInButton:{
      borderRadius:15,
    },
    customStyleText:{
      color:Colors.PRIMARY
    },
   
  })