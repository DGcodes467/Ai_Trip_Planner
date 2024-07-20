import {Text,StyleSheet,View} from 'react-native'
import { Tabs } from 'expo-router'
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function TabLayout() {
  return (
  <Tabs
  screenOptions={{headerShown:false,  tabBarActiveTintColor:'orangered',
  tabBarInactiveTintColor:'white',
  tabBarStyle:{

    borderRadius:15,
    margin:25,
    backgroundColor:'black',
    height:65,
    paddingBottom:10,
    position:'absolute'
  }

  }}

  >


<Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
        
          tabBarIcon: ({ color, focused }) => (
           
              <Ionicons name="home" size={24} color={color} />
          
          ),
        }}
      />

<Tabs.Screen
        name="mytrip"
        options={{
          tabBarLabel: 'My Trip',
          tabBarIcon: ({ color, focused }) => (
           
              <FontAwesome6 name="map-location-dot" size={24} color={color} />
          
          ),
        }}
      />

    <Tabs.Screen
    name='explore'
    options={{
      tabBarLabel:'Explore',
      tabBarIcon: ({ color}) => (
           
        <MaterialCommunityIcons name="compass" size={28} color={color} />    
       
      ),

    }}
    />
      

<Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color}) => (
           
            <MaterialCommunityIcons name="account-circle-outline" size={24} color={color} />    
           
          ),
        }}
      />

    
  </Tabs>
  )
}



