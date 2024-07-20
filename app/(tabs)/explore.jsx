import {View,Text} from 'react-native'
import SearchPlace from '../../components/SearchPlace'

export default function Explore() {

    return(
        <View  style={{
            paddingTop:50,
            height:'100%'}}
        >
                <View style={{padding:25,paddingBottom:10}}>
                    <Text style={{color:'gray',fontFamily:'outfit-medium',fontSize:22}}>Build your Trip with</Text>
                    <Text style={{fontFamily:'outfit-bold',fontSize:25}}>Ai insights.</Text>
                </View>
                <SearchPlace />
        </View>
    )
} 