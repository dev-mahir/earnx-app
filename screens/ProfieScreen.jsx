import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Image
          source={require('../assets/earnx.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Lily, $120.00</Text>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Total earnings</Text>
          <View style={styles.infoValueContainer}>
            <Text style={styles.infoValue}>$120.00</Text>
            <TouchableOpacity style={styles.arrowIcon}>
              <Text>→</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Tokens balance</Text>
          <View style={styles.infoValueContainer}>
            <Text style={styles.infoValue}>10,000</Text>
            <TouchableOpacity style={styles.arrowIcon}>
              <Text>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.settingsSection}>
        <Text style={styles.settingsTitle}>Settings</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Notifications</Text>
          <TouchableOpacity style={styles.arrowIcon}>
            <Text>→</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Privacy</Text>
          <TouchableOpacity style={styles.arrowIcon}>
            <Text>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  searchIcon: {
    padding: 10,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  editProfileButton: {
    backgroundColor: '#e9eef2',
    padding: 10,
    borderRadius: 5,
  },
  editProfileText: {
    color: '#00',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  infoTitle: {
    fontSize: 16,
  },
  infoValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 16,
    marginRight: 10,
  },
  arrowIcon: {
    padding: 5,
  },
  settingsSection: {
    marginTop: 20,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ProfileScreen;
