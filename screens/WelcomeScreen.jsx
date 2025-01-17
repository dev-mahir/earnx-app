import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import BannerAds from '../components/ads/BannerAds';

const WelcomeBackScreen = ({navigation}) => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    navigation.navigate('Game');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <View style={styles.imgContainer}>
        <Image source={require('../assets/earnx.png')} style={styles.image} />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={value =>
          setInput(prevState => ({...prevState, email: value}))
        }
        placeholder="Email"
      />

      <TextInput
        style={styles.input}
        onChangeText={value =>
          setInput(prevState => ({...prevState, password: value}))
        }
        placeholder="Password"
        maxLength={6}
        secureTextEntry
      />
      <TouchableOpacity>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        New user? <Text style={styles.linkText}>Sign Up</Text>
      </Text>

      <BannerAds />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 100,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#F4F4F4',
  },
  forgotText: {
    color: '#007AFF',
    textAlign: 'right',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    textAlign: 'center',
    fontSize: 16,
  },
  linkText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default WelcomeBackScreen;
