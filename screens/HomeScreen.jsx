import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import BannerAds from '../components/ads/BannerAds';
import ModalCom from '../components/modal/ModalCom';
import Icon from 'react-native-vector-icons/MaterialIcons';
const options = [
  {id: '0', title: 'Game', icon: '🎮'},
  {id: '2', title: 'Quiz', icon: '❓'},
  {id: '3', title: 'Web Task', icon: '📝'},
  {id: '4', title: 'Video Task', icon: '🎥'},
  {id: '5', title: 'Reward', icon: '🎁'},
  {id: '6', title: 'Refer', icon: '🔄'},
];

export default function HomeScreen({navigation}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ModalCom setOpen={setOpen} open={open} />}

      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {/* Left Icon */}

          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="menu" size={32} color="#000" />
          </TouchableOpacity>

          {/* Center Button */}
          <TouchableOpacity style={styles.centerButton}>
            <Icon name="menu" size={32} color="#000" />
            <Text style={styles.centerText}>Balance</Text>
          </TouchableOpacity>

          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                style={styles.profilePhoto}
                source={require('../assets/mahir.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <Icon name="menu" size={32} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <Image style={styles.banner} source={require('../assets/banner.png')} />

        <FlatList
          data={options}
          numColumns={3}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                setOpen(!open); // Assuming setOpen controls the modal or similar logic
              }}>
              <Text style={styles.cardIcon}>{item.icon}</Text>
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <BannerAds />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#7D4DD3',
    padding: 10,
    borderRadius: 25,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  centerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  centerIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: 'contain',
  },
  profileContainer: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },
  profilePhoto: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  centerText: {
    fontSize: 14,
    color: '#7D4DD3',
    fontWeight: 'bold',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
    backgroundColor: '#ddd',
  },
  headerText: {
    fontSize: 20,
    color: '#6A0DAD',
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },

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
  cardIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: '#111',
    fontWeight: 600,
  },
});
