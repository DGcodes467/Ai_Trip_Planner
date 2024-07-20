import React,{useEffect} from 'react';
import { Text, View, Image, TouchableOpacity, Alert,StyleSheet } from 'react-native';
import moment from 'moment';
import { Ionicons } from 'react-native-vector-icons';
import { doc, deleteDoc } from 'firebase/firestore';
import  {db}  from './../configs/FirebaseConfig'; // Import Firebase db from your configuration file

export default function UserTripCard({ trip }) {
    const formatData = (data) => {
        return JSON.parse(data);
    };

    const handleDelete = async () => {
        const tripId = trip.docId; // Assuming 'docId' is the unique identifier for the trip document
    
        try {
            await deleteDoc(doc(db, 'UserTrips', tripId));
            console.log('Trip deleted successfully');
            Alert.alert('Success', 'Trip deleted successfully.');
        } catch (error) {
            console.error('Error deleting trip: ', error);
            Alert.alert('Error', 'Failed to delete trip. Please try again.');
        }
    };

    return (
        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 15, padding: 10 }}>
            <Image
                source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${formatData(trip.tripData).locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}` }}
                style={{ width: 100, height: 100, borderRadius: 15 }}
            />
            <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontFamily: 'outfit-medium', fontSize: 15 }}>📍{trip.GeminiResponse.trip.destination}</Text>
                <Text>🗓️{moment(formatData(trip.tripData).startDate).format('DD MMM yyyy')}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <View style={{ padding: 5, borderRadius: 7, backgroundColor: 'orange' }}>
                        <Text style={{ color: 'white' }}>{formatData(trip.tripData).traveller.title}</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={handleDelete} 
                        style={{marginLeft:'55%' }}
                    >
                        <Ionicons name="trash" size={20} color="red" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
   
    icon:{
        borderWidth:1,
        borderColor:'lightgray',
        backgroundColor:'white',
        borderRadius:100,
        padding:6,
        textAlign:'center'
    },
  
  
});

