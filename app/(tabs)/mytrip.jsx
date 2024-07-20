import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../configs/FirebaseConfig';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import NewTrip from '../../components/NewTrip';
import UserTripList from '../../components/UserTripList';
import { useRouter } from 'expo-router';

export default function MyTripScreen() {
  const router=useRouter()
  const user = auth.currentUser;
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && getMyTrips();
  }, [user]);

  const getMyTrips = async () => {
    setLoading(true);
    const q = query(collection(db, 'UserTrips'), where('UserEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push(doc.data());
    });
    setUserTrips(trips);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1,backgroundColor:'ghostwhite',paddingBottom:88,}}>
      <View style={{ padding: 25, paddingTop: 60,paddingBottom:0, backgroundColor: Colors.WHITE }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>My Trips</Text>
          <TouchableOpacity onPress={()=>router.push('/(tabs)/home')}>
          <Ionicons name="add-circle" size={35} color="black"/>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: Colors.WHITE ,padding:25,}}>
        {loading && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        )}
        {!loading && userTrips?.length === 0 && <NewTrip />}
        {!loading && userTrips?.length > 0 && <UserTripList userTrips={userTrips} />}
      </ScrollView>
    </View>
  );
}
