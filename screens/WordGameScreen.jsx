import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import BannerAds from '../components/ads/BannerAds';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

import { IN_AD_ID_PRO, IN_AD_ID_DEV } from '@env';


const interstitialAdUnitId = __DEV__ ? IN_AD_ID_DEV : IN_AD_ID_PRO;

console.log(interstitialAdUnitId);


const interstitialAd = InterstitialAd.createForAdRequest(interstitialAdUnitId, {
  requestNonPersonalizedAdsOnly: true, 
});


const showInterstitialAd = () => {
  if (interstitialAd.isLoaded) {
    interstitialAd.show();
  } else {
    console.log('Interstitial Ad not ready, loading...');
    interstitialAd.load(); 
  }
};

export default function WordGameScreen() {
  const words = ['javascript', 'python', 'ruby', 'java', 'html', 'css'];
  const [currentWord, setCurrentWord] = useState('');
  const [missingIndex, setMissingIndex] = useState(-1);
  const [wordDisplay, setWordDisplay] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [result, setResult] = useState('');
  const [hint, setHint] = useState('');
  const [timeLeft, setTimeLeft] = useState(15); // Timer starts at 15 seconds
  const [isGameOver, setIsGameOver] = useState(false);

  // Generate a random word with a missing letter
  const generateWord = () => {
    const timeOver = 15; // Reset timer to 15 seconds
    const randomIndex = Math.floor(Math.random() * words.length);
    const selectedWord = words[randomIndex];
    const missingLetterIndex = Math.floor(Math.random() * selectedWord.length);

    setCurrentWord(selectedWord);
    setMissingIndex(missingLetterIndex);

    const wordWithMissing =
      selectedWord.substring(0, missingLetterIndex) +
      '_' +
      selectedWord.substring(missingLetterIndex + 1);
    setWordDisplay(wordWithMissing);

    // Generate a hint by revealing the missing letter
    const revealedHint = `The missing letter is "${selectedWord[missingLetterIndex]}"`;
    setHint(revealedHint);

    setUserInput('');
    setResult('');
    setTimeLeft(timeOver); // Reset the timer for each word
  };

  // Check if the user's guess is correct
  const checkGuess = () => {
    showInterstitialAd(); // Show the interstitial ad

    if (userInput.toLowerCase() === currentWord) {
      setScore(prevScore => prevScore + 5);
      setResult('Success! You guessed correctly. 🎉');
      setTimeout(() => generateWord(), 1000);
    } else {
      setResult('Incorrect. Try again! 😞');
    }
  };

  // Handle timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsGameOver(true);
      Alert.alert("Time's up!", 'Game Over. Try again.', [
        {text: 'Restart', onPress: restartGame},
      ]);
    }
  }, [timeLeft, isGameOver]);

  // Restart the game
  const restartGame = () => {
    setScore(0);
    setIsGameOver(false);
    generateWord();
  };

  // Initialize the game and interstitial ad on mount
  useEffect(() => {
    generateWord();

    // Load interstitial ad and set up event listeners
    const unsubscribeLoaded = interstitialAd.addAdEventListener(
      AdEventType.LOADED,
      () => {
        console.log('Interstitial Ad loaded');
      },
    );

    const unsubscribeClosed = interstitialAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        console.log('Interstitial Ad closed, reloading...');
        interstitialAd.load(); // Reload the ad after it closes
      },
    );

    const unsubscribeError = interstitialAd.addAdEventListener(
      AdEventType.ERROR,
      error => {
        console.error('Interstitial Ad error:', error);
      },
    );

    interstitialAd.load(); // Load the ad initially

    // Cleanup event listeners on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, []);

  return (
    <>
      <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
        <BannerAds />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Guess the word and type the full word.</Text>

        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>Time Left: {timeLeft}s</Text>
        </View>

        <View style={styles.game}>
          <Text style={styles.wordDisplay}>Word: {wordDisplay}</Text>
          <TextInput
            style={styles.input}
            value={userInput}
            placeholder="Enter the full word"
            onChangeText={setUserInput}
          />
          <TouchableOpacity style={styles.button} onPress={checkGuess}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <Text style={styles.result}>{result}</Text>
          <Text style={styles.score}>Score: {score}</Text>
        </View>

        <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
          <Text style={styles.restartButtonText}>Restart Game</Text>
        </TouchableOpacity>
      </View>

      <View style={{textAlign: 'center'}}>
        <BannerAds />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  game: {
    alignItems: 'center',
    marginBottom: 20,
  },
  wordDisplay: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#e9e9e9',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  result: {
    fontSize: 16,
    marginVertical: 10,
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  restartButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#FF4500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  restartButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
