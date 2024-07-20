import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from './../../configs/FirebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Svg, { Line } from 'react-native-svg';

const ProfileScreen = () => {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');

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
    }, [router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            ToastAndroid.show("Logged Out Successfully", ToastAndroid.BOTTOM);
            router.push('auth/sign-in');
        } catch (error) {
            console.log('Error logging out: ', error);
            ToastAndroid.show("Error logging out", ToastAndroid.BOTTOM);
        }
    };

    const handleChangeProfilePic = () => {
        console.log('Change profile picture clicked');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>My Profile</Text>
            <View style={styles.card}>
                <Svg height="120%" width="120%" style={styles.gridLines}>
                    {Array.from({ length: 150 }).map((_, index) => (
                        <Line
                            key={`v-${index}`}
                            x1={index * 10}
                            y1="0"
                            x2={index * 10}
                            y2="100%"
                            stroke="lightgray"
                            strokeWidth="0.5"
                        />
                    ))}
                    {Array.from({ length: 150 }).map((_, index) => (
                        <Line
                            key={`h-${index}`}
                            x1="0"
                            y1={index * 10}
                            x2="100%"
                            y2={index * 10}
                            stroke="lightgray"
                            strokeWidth="0.5"
                        />
                    ))}
                </Svg>
                <View style={styles.header}>
                    
                    <TouchableOpacity onPress={handleChangeProfilePic} style={styles.profilePicContainer}>
                        <Avatar.Image
                            size={100}
                            source={require('./../../assets/images/Dummy.jpeg')} // Replace with actual profile picture source
                        />
                        <View style={styles.cameraIcon}>
                            <Icon name="camera" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.name}>{userName}</Text>
                    <Text style={styles.email}>{userEmail}</Text>
                </View>
                <View style={styles.actions}>
                    <Button
                        icon={({ color, size }) => (
                            <Icon name="logout" color={color} size={size} />
                        )}
                        mode="contained"
                        onPress={handleLogout}
                        style={styles.logoutButton}
                    >
                        Logout
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'relative',
        overflow: 'hidden',
    },
    gridLines: {
        position: 'absolute',
        top: 0,
        
        left: 0,
        
        width: '100%',
        height: '100%',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        
    },
    profilePicContainer: {
        position: 'relative',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth:2,
        borderRadius:60,
        padding:2,
        borderTopColor:'red',
        borderLeftColor:'blue',
        borderRightColor:'pink',
        borderBottomColor:'green'
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'gray',
        padding: 5,
        borderRadius: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    email: {
        fontSize: 16,
        color: 'gray',
        marginTop: 5,
    },
    actions: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    logoutButton: {
        marginTop: 10,
    },
});

export default ProfileScreen;
