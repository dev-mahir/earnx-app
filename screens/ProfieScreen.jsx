import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon set

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Image
          source={require('../assets/mahir.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Mahir, $120.00</Text>
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
              <FontAwesome name="angle-right" size={18} color="#888" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Tokens balance</Text>
          <View style={styles.infoValueContainer}>
            <Text style={styles.infoValue}>10,000</Text>
            <TouchableOpacity style={styles.arrowIcon}>
              <FontAwesome name="angle-right" size={18} color="#888" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsTitle}>Settings</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Notifications</Text>
          <TouchableOpacity style={styles.arrowIcon}>
            <FontAwesome name="angle-right" size={18} color="#888" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Privacy</Text>
          <TouchableOpacity style={styles.arrowIcon}>
            <FontAwesome name="angle-right" size={18} color="#888" />
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
  profileInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ddd',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  editProfileButton: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  editProfileText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '500',
  },
  infoSection: {
    marginBottom: 30,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  infoTitle: {
    fontSize: 16,
    color: '#333',
  },
  infoValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
    color: '#333',
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
    marginBottom: 15,
    color: '#333',
  },
});

export default ProfileScreen;
