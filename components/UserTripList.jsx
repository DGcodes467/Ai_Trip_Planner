import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useRouter } from 'expo-router';
import UserTripCard from './UserTripCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../configs/FirebaseConfig';

export default function UserTripList({ userTrips }) {
    const router = useRouter();
    const [trips, setTrips] = useState(userTrips);

    // Fetch trips from Firestore (replace with your actual fetch logic)
    const fetchTrips = async () => {
        try {
            const tripsCollection = collection(db, 'UserTrips');
            const tripSnapshot = await getDocs(tripsCollection);
            const tripsList = tripSnapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
            setTrips(tripsList);
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    // Callback to handle deletion of a trip
    const handleDelete = (deletedTripId) => {
        fetchTrips(); // Re-fetch trips to refresh the list
    };

    // Sort the trips by startDate in ascending order (upcoming dates first)
    const sortedTrips = [...trips].sort((a, b) => {
        const dateA = new Date(JSON.parse(a.tripData).startDate);
        const dateB = new Date(JSON.parse(b.tripData).startDate);
        return dateA - dateB;
    });
    const LatestTrip = JSON.parse(sortedTrips[0].tripData);

    return (
        <View style={{ width: '100%', padding: 2 }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 15, shadowOpacity: 2, elevation: 2, shadowRadius: 5 }}>
                {LatestTrip?.locationInfo?.photoRef ? 
                    <Image 
                        source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${LatestTrip.locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}` }}
                        style={{ width: '100%', height: 240, resizeMode: 'cover', borderRadius: 15 }}
                    /> 
                    : 
                    <Image 
                        source={require('./../assets/images/frontfinal.jpg')}
                        style={{ width: '100%', height: 240, resizeMode: 'cover', borderRadius: 15 }}
                    />
                }
                <View style={{ marginTop: 10, padding: 10 }}>
                    <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>📍{sortedTrips[0]?.GeminiResponse?.trip?.destination}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <Text style={{ fontFamily: 'outfit', fontSize: 17, color: 'gray' }}>🗓️{moment(LatestTrip.startDate).format('DD MMM yyyy')}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                            <Text style={{ color: 'gray' }}></Text>
                            <View style={{ padding: 2, borderRadius: 7, borderColor: 'gray', fontFamily: 'outfit', backgroundColor: 'orange' }}>
                                <Text style={{ color: '#fff' }}>{LatestTrip.traveller.title}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity 
                        onPress={() => { 
                            router.push({ 
                                pathname: '/trip-details',
                                params: { trip: JSON.stringify(sortedTrips[0]) }
                            });
                        }} 
                        style={{ marginVertical: 10, backgroundColor: 'black', padding: 10, borderRadius: 15 }}
                    >
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 22 }}>See Your Plans</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginBottom: 40 }}>
                {sortedTrips.map((trip, index) => (
                    <TouchableOpacity 
                        key={index} 
                        onPress={() => { 
                            router.push({ 
                                pathname: '/trip-details',
                                params: { trip: JSON.stringify(sortedTrips[index]) }
                            });
                        }}
                    >
                        <UserTripCard trip={trip} onDelete={handleDelete} key={index} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
