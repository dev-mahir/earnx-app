import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const CarGameScreen = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(0);
  const [carPosition, setCarPosition] = useState(
    new Animated.Value(width / 2 - 25),
  );
  const [isPaused, setIsPaused] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [coinsList, setCoinsList] = useState([]);

  useEffect(() => {
    loadGameData();
    const gameInterval = setInterval(gameLoop, 500);
    return () => clearInterval(gameInterval);
  }, []);

  const loadGameData = () => {
    const savedScore = parseInt(localStorage.getItem('score')) || 0;
    const savedLevel = parseInt(localStorage.getItem('level')) || 1;
    const savedCoins = parseInt(localStorage.getItem('coins')) || 0;

    setScore(savedScore);
    setLevel(savedLevel);
    setCoins(savedCoins);
  };

  const saveGameData = () => {
    localStorage.setItem('score', score);
    localStorage.setItem('level', level);
    localStorage.setItem('coins', coins);
  };

  const updateScore = () => {
    setScore(prevScore => {
      const newScore = prevScore + 1;
      if (newScore % 100 === 0) {
        setLevel(prevLevel => prevLevel + 1);
      }
      return newScore;
    });
  };

  const updateCoins = (isGold = true) => {
    setCoins(prevCoins => prevCoins + (isGold ? 5 : 2));
  };

  const createObstacle = () => {
    const leftPosition = Math.random() * (width - 50);
    setObstacles(prev => [...prev, {left: leftPosition}]);
  };

  const createCoin = () => {
    const leftPosition = Math.random() * (width - 50);
    setCoinsList(prev => [...prev, {left: leftPosition, type: 'gold'}]);
  };

  const createSilverCoin = () => {
    const leftPosition = Math.random() * (width - 50);
    setCoinsList(prev => [...prev, {left: leftPosition, type: 'silver'}]);
  };

  const checkCollision = element => {
    // Collision detection logic
  };

  const gameLoop = () => {
    if (isPaused) return;

    updateScore();
    if (Math.random() < 0.3) createObstacle();
    if (Math.random() < 0.1) createCoin();
    if (Math.random() < 0.2) createSilverCoin();
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <View style={styles.gameArea}>
      <View style={styles.road}>
        <Animated.View style={[styles.car, {left: carPosition}]} />
        {obstacles.map((obstacle, index) => (
          <View key={index} style={[styles.obstacle, {left: obstacle.left}]} />
        ))}
        {coinsList.map((coin, index) => (
          <View key={index} style={[styles.coin, {left: coin.left}]} />
        ))}
      </View>
      <View style={styles.scoreBoard}>
        <Text style={styles.scoreText}>
          Score: {score} | Level: {level} | Coins: {coins}
        </Text>
      </View>
      <TouchableOpacity style={styles.pauseButton} onPress={togglePause}>
        <Text>{isPaused ? 'Resume' : 'Pause'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gameArea: {
    flex: 1,
    backgroundColor: '#555',
    overflow: 'hidden',
  },
  road: {
    position: 'relative',
    width: '80%',
    height: '100%',
    marginLeft: '10%',
    backgroundColor: '#eee',
    borderColor: 'red',
    borderWidth: 2,
  },
  car: {
    position: 'absolute',
    bottom: 20,
    width: 50,
    height: 100,
    backgroundColor: 'blue', // Placeholder for car image
  },
  obstacle: {
    position: 'absolute',
    width: 35,
    height: 35,
    backgroundColor: 'red',
  },
  coin: {
    position: 'absolute',
    width: 35,
    height: 35,
    backgroundColor: 'gold', // Placeholder for coin image
  },
  scoreBoard: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: 'white',
    fontSize: 20,
  },
  pauseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  scoreText: {
    color: 'white',
  },
});

export default CarGameScreen;
