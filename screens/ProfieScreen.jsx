import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lily</Text>
      <Text style={styles.amount}>$120.00</Text>

      <View style={styles.separator} />

      <Text style={styles.label}>Total earnings</Text>
      <Text style={styles.amount}>$120.00</Text>

      <View style={styles.separator} />

      <View style={styles.tokenContainer}>
        <Text style={styles.label}>Tokens balance</Text>
        <Text style={styles.tokenAmount}>10,000</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.navContainer}>
        <Text style={styles.navItem}>Home</Text>
        <Text style={styles.navItem}>Game Rules</Text>
        <Text style={styles.navItem}>Store</Text>
        <Text style={styles.navItem}>Profile</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amount: {
    fontSize: 18,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  tokenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tokenAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  navItem: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;
