import React from 'react'
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'

export default function Button({name,path,customStyle,customStyleText,icon}) {
  return (
   <View>
     <TouchableOpacity style={[styles.button, customStyle] } onPress={()=>router.push(path)}>
            <Text style={[styles.buttonText, customStyleText]}>{name}{icon}</Text>
        </TouchableOpacity>
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

