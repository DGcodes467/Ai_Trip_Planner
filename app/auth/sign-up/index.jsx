import { View, Text, TextInput, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { Colors } from '@/constants/Colors';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './../../../configs/FirebaseConfig';
import { setDoc, doc } from 'firebase/firestore';

function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const onCreateAccount = () => {
    if (!email || !password || !fullName) {
      ToastAndroid.show('Please enter all details', ToastAndroid.BOTTOM);
      return;
    }
    if (password.length < 7) {
      ToastAndroid.show("Password should be at least 7 characters long", ToastAndroid.BOTTOM);
      return;
    }
    if (!email.includes("@")) {
      ToastAndroid.show("Invalid Email", ToastAndroid.BOTTOM);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        
        await setDoc(doc(db, 'UserInfo', user.uid), {
          fullName: fullName,
          email: email
        });

        ToastAndroid.show("Account Created Successfully.", ToastAndroid.CENTER);
        router.replace('/mytrip');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
  }

  return (
    <View style={{ padding: 25, paddingTop: 60, backgroundColor: Colors.WHITE, height: '100%' }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, marginTop: 30 }}>Create New Account</Text>
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontFamily: 'outfit' }}>Full Name</Text>
        <TextInput placeholder='Enter your full name' style={styles.input} onChangeText={(value) => setFullName(value)} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: 'outfit' }}>Email</Text>
        <TextInput placeholder='Enter your email' style={styles.input} onChangeText={(value) => setEmail(value)} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: 'outfit' }}>Password</Text>
        <TextInput secureTextEntry={true} placeholder='Enter your password' style={styles.input} onChangeText={(value) => setPassword(value)} />
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={onCreateAccount}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 16 }}>Already have an account?</Text>
        <Button name='Sign In' path='auth/sign-in' customStyle={styles.signInButton} customStyleText={styles.customStyleText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'gray',
    fontFamily: 'outfit',
    fontSize: 20
  },
  signInButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 0
  },
  customStyleText: {
    color: 'black'
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: '20%'
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 20
  }
});

export default SignUp;
