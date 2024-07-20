import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity,Animated } from 'react-native';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from './../../configs/FirebaseConfig'; // Adjust the path as needed
import { onAuthStateChanged } from 'firebase/auth';
import HomeCard from '../../components/HomeCard';
import { homeData } from './../../constants/homeData'; // Ensure correct path
import { Ionicons } from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';



export default function Home() { 
    const router=useRouter();
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [activeItem, setActiveItem] = useState('India 💖'); // Set default active item
    const [places, setPlaces] = useState([]);
    const [temples, setTemples] = useState([]);


    
  

    useEffect(() => {
        const fetchUserData = async (userId) => {
            const userDoc = doc(db, 'UserInfo', userId);
            const userSnapshot = await getDoc(userDoc);

            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                setUserEmail(userData.email);
                setUserName(userData.fullName);
            } else {
                console.log('No such document!');
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserData(user.uid);
            } else {
                router.push('auth/sign-in');
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        setPlaces(homeData[activeItem.toLowerCase()] || []);
    }, [activeItem]);

    useEffect(()=>{
        setTemples(homeData['temples'])
    })

    const handleItemPress = (item) => {
        setActiveItem(item);
    };

    return (
        <View style={styles.home}>
            <View style={{ paddingLeft: 25, paddingRight: 25,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center' }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <LinearGradient
        colors={['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888', '#9b3af9']}
        style={styles.gradient}
      >
                        <Image 
                            source={require('./../../assets/images/Dummy.jpeg')}
                            style={{
                                width: 55,
                                height: 55,
                                borderRadius: 99,
                                position: 'relative',
                                alignItems: 'center',
                                //marginBottom: 20,
                            }}
                        />
                    </LinearGradient>
                    <Text style={{ fontFamily: 'outfit', fontSize: 16 }}>
                        Hi, <Text style={{ fontFamily: 'outfit-medium', fontSize: 18 }}>{userName}!</Text>
                    </Text>
                </View>
                <TouchableOpacity onPress={()=>router.push('/(tabs)/explore')}>
                <Ionicons name="search" size={20} color="gray" style={styles.icon} />
                </TouchableOpacity>
            </View>

            <View>
                <Text style={{ fontFamily: 'outfit-medium', fontSize: 28, marginTop: 30, marginLeft: 25 }}>
                    Find Places for your
                </Text>
                <Text style={{ fontFamily: 'outfit-medium', fontSize: 28, marginLeft: 25 }}>
                    best <Text style={{ fontFamily: 'outfit-bold' }}>Travel</Text>
                </Text>
            </View>
            
           <ScrollView>
            <View style={{paddingHorizontal:20}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                    {['India 💖', 'Top destinations', 'Mountains', 'Beaches'].map((item, index) => (
                        <TouchableOpacity 
                            key={index} 
                            onPress={() => handleItemPress(item)} 
                            style={[styles.item, activeItem === item && styles.activeItem]}
                        >
                            <Text style={[styles.text, activeItem === item && styles.activeText]}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View >
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{padding:10}}>
                {places.map((place) => (
                    <HomeCard
                        key={place.id}
                        photo="front.png" // Replace with actual image URL
                        name={place.name}
                        rating={place.rating}
                        location={place.address}
                        entryFee={place.entry_price}
                    />
                ))}
            </ScrollView>
            </View>

            <View style={{padding:25,paddingBottom:5 }}>
                <Text style={{fontSize:22,fontFamily:'outfit-medium',color:'black'}}>Explore the <Text style={{color:'orangered'}}>Temples</Text> of India.</Text>
            
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{padding:10}}>
                {temples.map((temple) => (
                    <HomeCard
                        key={temple.id}
                        photo="front.png" // Replace with actual image URL
                        name={temple.name}
                        rating={temple.rating}
                        location={temple.address}
                        entryFee={temple.entry_price}
                    />
                ))}
            </ScrollView>
            <View style={{padding:15,backgroundColor:'white',borderRadius:16,margin:20}}>
                <Text style={{fontFamily:'outfit-medium',fontSize:21}}>Want to Explore more..?</Text>
                <Text style={{color:'gray',fontFamily:'outfit',fontSize:18}}>Just start searching your Destination by clicking on the search icon.</Text>
                
            </View>

            <View style={{marginBottom:20}}>
                <Text style={{textAlign:'center',fontFamily:'outfit-bold',fontSize:20}}>Happy Journey✈️</Text>
            </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    home: { paddingTop: 50, backgroundColor: 'ghostwhite', height: '100%',paddingBottom:80 },
    imgdiv: {
        height: 60,
        width: 60,
        borderRadius: 99,
        position: 'relative',
        borderWidth: 2,
        borderRadius: 60,
        padding: 2,
        borderTopColor: 'red',
        borderLeftColor: 'blue',
        borderRightColor: 'pink',
        borderBottomColor: 'green'
    },
    gradient: {
        height: 60,
        width: 60,
        borderRadius: 99,
        position: 'relative',
        borderRadius: 60,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    
      },
    scrollView: {
        paddingHorizontal: 10,
        marginTop: 20,
        
    },
    icon:{
        borderWidth:1,
        borderColor:'lightgray',
        backgroundColor:'white',
        borderRadius:100,
        padding:6
    },
    item: {
        padding: 3,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    activeItem: {
        borderWidth: 1,
        borderColor: 'purple',
       
    },
    text: {
        color: 'gray',
        fontFamily: 'outfit',
        fontSize: 18,
    },
    activeText: {
        color: 'black',
        fontFamily:'outfit-medium', // Optional: makes the text bolder for better emphasis
    },
});
