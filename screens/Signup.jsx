import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Google Sign-In Configuration
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID', // Replace with your actual Web Client ID
});

const SignUpScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  // Phone Number Sign Up
  const handlePhoneSignUp = async () => {
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
      Alert.alert('Phone Sign Up Successful');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Email Sign Up
  const handleEmailSignUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Email Sign Up Successful');
    } catch (error) {
      Alert.alert('Error signing up with email', error.message);
    }
  };

  // Google Sign Up
  const handleGoogleSignUp = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = userInfo;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      Alert.alert('Google Sign Up Successful');
    } catch (error) {
      Alert.alert('Google Sign Up Failed', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>Sign Up</Text>

      {/* Phone Number Sign Up */}
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Sign Up with Phone" onPress={handlePhoneSignUp} />

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

      {/* Email Sign Up */}
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
      <Button title="Sign Up with Email" onPress={handleEmailSignUp} />

      {/* Google Sign Up */}
      <TouchableOpacity onPress={handleGoogleSignUp}>
        <Text style={{ color: 'blue', textAlign: 'center', marginTop: 20 }}>Sign Up with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;