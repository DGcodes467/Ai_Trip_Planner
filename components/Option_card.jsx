import {View,Text} from 'react-native'
import React from 'react'

function OptionCard({option,selectedOption}){
    return(
        <View style={[{padding:15,display:'flex',flexDirection:'row',justifyContent:'space-between',backgroundColor:'aliceblue',borderRadius:15,padding:25}
        
        ,selectedOption?.id==option?.id && {borderWidth:2}]}>
            <View>
            <Text style={{
                fontFamily:'outfit-bold',fontSize:20,
            }}>{option?.title}</Text>

             <Text style={{
                fontFamily:'outfit',fontSize:17,
                color:'gray'
            }}>{option?.desc}</Text>
            </View>

            <Text style={{
                fontFamily:'outfit-bold',fontSize:35,
            }}>{option?.icon}</Text>
        </View>
    )
}

export default OptionCard