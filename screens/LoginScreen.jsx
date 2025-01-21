import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Firebase Configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Google Sign-In Configuration
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID',
});

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const handlePhoneLogin = async () => {
    try {
      const confirmationResult = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirmation(confirmationResult);
      setIsOtpSent(true);
      Alert.alert('OTP sent');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleOtpVerification = async () => {
    try {
      await confirmation.confirm(otp);
      Alert.alert('Phone login successful');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleEmailLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Logged in successfully');
    } catch (error) {
      Alert.alert('Error logging in', error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = userInfo;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      Alert.alert('Logged in successfully with Google');
    } catch (error) {
      Alert.alert('Google login failed', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>Login</Text>

      {/* Phone Number Login */}
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Login with Phone" onPress={handlePhoneLogin} />

      {isOtpSent && (
        <>
          <TextInput
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
          />
          <Button title="Verify OTP" onPress={handleOtpVerification} />
        </>
      )}

      {/* Email Login */}
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        placeholder="Enter Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login with Email" onPress={handleEmailLogin} />

      {/* Google Login */}
      <TouchableOpacity onPress={handleGoogleLogin}>
        <Text style={{ color: 'blue', textAlign: 'center', marginTop: 20 }}>Login with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;