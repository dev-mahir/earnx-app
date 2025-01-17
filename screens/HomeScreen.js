import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const options = [
  { id: '1', title: 'আপলোড', icon: '⬆️' },
  { id: '2', title: 'কুইজ', icon: '❓' },
  { id: '3', title: 'ওভার টাক', icon: '📝' },
  { id: '4', title: 'ভিডিও টাক', icon: '🎥' },
  { id: '5', title: 'রেওয়ার্ড', icon: '🎁' },
  { id: '6', title: 'রেফার', icon: '🔄' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>ব্যালেন্স দেখুন</Text>
      </View>

      {/* Banner */}
      <Image
        style={styles.banner}
        source={{ uri: 'https://via.placeholder.com/300x150' }}
      />

      {/* NID Section */}
      <View style={styles.nidBox}>
        <Text style={styles.nidText}>
          আপনার NID ভেরিফিকেশন সম্পন্ন হয়নি। তথ্য দিন।
        </Text>
        <TouchableOpacity style={styles.nidButton}>
          <Text style={styles.nidButtonText}>তথ্য দিন</Text>
        </TouchableOpacity>
      </View>

      {/* Options Grid */}
      <FlatList
        data={options}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardIcon}>{item.icon}</Text>
            <Text style={styles.cardText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  header: { alignItems: 'center', marginVertical: 10 },
  headerText: { fontSize: 20, color: '#6A0DAD' },
  banner: { width: '100%', height: 150, borderRadius: 10, marginBottom: 10 },
  nidBox: {
    backgroundColor: '#FFDAB9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  nidText: { fontSize: 14, color: '#000' },
  nidButton: {
    backgroundColor: '#FF4500',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  nidButtonText: { color: '#fff', textAlign: 'center' },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  cardIcon: { fontSize: 24, marginBottom: 5 },
  cardText: { fontSize: 14, color: '#6A0DAD' },
});
