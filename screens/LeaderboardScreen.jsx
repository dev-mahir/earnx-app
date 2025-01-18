import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import BannerAds from '../components/ads/BannerAds';

// Updated leaderboard data
const leaderboardData = [
  { id: '1', name: 'Justin', earnings: '$1500', points: '500', joined: '01/01/2022', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '2', name: 'Brian', earnings: '$1423', points: '480', joined: '02/01/2022', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '3', name: 'Alex', earnings: '$1300', points: '450', joined: '03/01/2022', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '4', name: 'Emily', earnings: '$1200', points: '400', joined: '04/01/2022', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '5', name: 'Bob', earnings: '$1100', points: '380', joined: '05/01/2022', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '6', name: 'Michelle', earnings: '$1000', points: '350', joined: '06/01/2022', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '7', name: 'Sarah', earnings: '$900', points: '300', joined: '07/01/2022', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '8', name: 'David', earnings: '$800', points: '280', joined: '08/01/2022', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '9', name: 'Laura', earnings: '$700', points: '250', joined: '09/01/2022', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
  { id: '10', name: 'William', earnings: '$600', points: '200', joined: '10/01/2022', image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
];

const Leaderboard = () => {
  // Sort the leaderboard data by points, then by earnings
  const sortedLeaderboardData = leaderboardData.sort((a, b) => {
    const pointsA = parseInt(a.points, 10);
    const pointsB = parseInt(b.points, 10);
    const earningsA = parseInt(a.earnings.replace('$', '').replace(',', ''), 10);
    const earningsB = parseInt(b.earnings.replace('$', '').replace(',', ''), 10);

    // Sort by points first
    if (pointsB !== pointsA) return pointsB - pointsA;

    // If points are equal, sort by earnings
    return earningsB - earningsA;
  });

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>
          {item.id}. {item.name}
        </Text>
        <Text style={styles.detailsText}>
          Total earnings: {item.earnings} · Points: {item.points}
        </Text>
        <Text style={styles.detailsText}>Joined: {item.joined}</Text>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={sortedLeaderboardData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <BannerAds />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsText: {
    fontSize: 14,
    color: '#666',
  },
});

export default Leaderboard;