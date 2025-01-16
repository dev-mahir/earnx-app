import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const InviteFriendsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invite Friends</Text>
      <Text style={styles.subtitle}>Get $5 for each friend you invite.</Text>
      <TouchableOpacity style={styles.inputBox}>
        <Text style={styles.copyText}>Copy Link</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareText}>Share on Twitter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareText}>Share on Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareText}>Share on Instagram</Text>
      </TouchableOpacity>
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
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  inputBox: {
    backgroundColor: '#F4F4F4',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  copyText: {
    fontSize: 16,
    color: '#666',
  },
  shareButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  shareText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default InviteFriendsScreen;
