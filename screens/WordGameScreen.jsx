import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

export default function WordGameScreen() {
  const words = ['javascript', 'python', 'ruby', 'java', 'html', 'css'];
  const [currentWord, setCurrentWord] = useState('');
  const [missingIndex, setMissingIndex] = useState(-1);
  const [wordDisplay, setWordDisplay] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [result, setResult] = useState('');
  const [timeLeft, setTimeLeft] = useState(15); // Timer starts at 15 seconds
  const [isGameOver, setIsGameOver] = useState(false);

  // Generate a random word with a missing letter
  const generateWord = () => {
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

    setUserInput('');
    setResult('');
    setTimeLeft(15); // Reset the timer for each word
  };

  // Check if the user's guess is correct
  const checkGuess = () => {
    if (userInput.toLowerCase() === currentWord) {
      setScore(prevScore => prevScore + 5);
      setResult('Correct! 🎉');
      setTimeout(() => generateWord(), 1000); // Generate a new word after a delay
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
        { text: 'Restart', onPress: restartGame },
      ]);
    }
  }, [timeLeft, isGameOver]);

  // Restart the game
  const restartGame = () => {
    setScore(0);
    setIsGameOver(false);
    generateWord();
  };

  // Initialize the game on mount
  useEffect(() => {
    generateWord();
  }, []);

  return (
    <>
      <View style={styles.adContainer}>
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
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

      <View style={styles.adContainer}>
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  adContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  timerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  game: {
    alignItems: 'center',
    marginBottom: 30,
  },
  wordDisplay: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    width: '80%',
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  result: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 10,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  restartButton: {
    marginTop: 30,
    backgroundColor: '#FF4500',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  restartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});