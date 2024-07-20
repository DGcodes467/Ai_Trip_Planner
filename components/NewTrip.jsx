import {Text,StyleSheet,View} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import Button from './Button'
import { useRouter } from 'expo-router';


export default function NewTrip() {
  const router=useRouter();
  
  return (
   <View style={{padding:20,marginTop:50,display:'flex',alignItems:'center',gap:20}}>
  <MaterialIcons name="location-pin" size={30} color="black" />
  <Text style={{fontSize:25,fontFamily:'outfit-medium',}}>No Trip Planned Yet.</Text>

  <Text style={{fontSize:20,fontFamily:'outfit',textAlign:'center',color:'gray'}}>
    Looks like it's time to plan for a wonderfull trip, awaiting for you just start creating a new & fresh one...!
  </Text>
  <Button name="Start a new Trip" path={'/(tabs)/home'}/>
   </View>
  )
}
