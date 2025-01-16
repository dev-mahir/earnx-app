import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {AntDesign} from '@expo/vector-icons'; // Import for eye icon

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    // Handle sign-up logic here (e.g., API call)
    console.log('Sign up with:', {
      email,
      firstName,
      lastName,
      username,
      password,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First name</Text>
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select username</Text>
        <View style={styles.usernameContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          {/* Add dropdown icon here */}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Create password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <AntDesign
              name={showPassword ? 'eyeo' : 'eye'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.appleButton}>
        <Text style={styles.buttonText}>Continue with Apple</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Add your custom styles here
});

export default SignUpScreen;
