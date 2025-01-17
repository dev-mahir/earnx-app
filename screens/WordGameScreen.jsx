import React, {useState, useEffect} from 'react';
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
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';

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
    const timeOver = 20;
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
    if (userInput.toLowerCase() === currentWord) {
      setScore(prevScore => prevScore + 5);
      setResult('Success! You guessed correctly. 🎉');
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

  // Initialize the game on mount
  useEffect(() => {
    generateWord();
  }, []);

  return (
    <>
      <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
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
          {/* <Text style={styles.hint}>{hint}</Text> */}
          <Text style={styles.score}>Score: {score}</Text>
        </View>

        <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
          <Text style={styles.restartButtonText}>Restart Game</Text>
        </TouchableOpacity>
      </View>

      <View style={{textAlign: 'center'}}>
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
    backgroundColor: '#f0f0f0', // Optional background color
  },
  adContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
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
  hint: {
    fontSize: 14,
    marginTop: 10,
    fontStyle: 'italic',
    color: '#888',
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

// import React, {useEffect, useState} from 'react';
// import {Button, Platform, StatusBar} from 'react-native';
// import {
//   InterstitialAd,
//   AdEventType,
//   TestIds,
// } from 'react-native-google-mobile-ads';

// const adUnitId = __DEV__
//   ? TestIds.INTERSTITIAL
//   : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

// const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
//   keywords: ['fashion', 'clothing'],
// });

// export default function LetterMissingGame() {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const unsubscribeLoaded = interstitial.addAdEventListener(
//       AdEventType.LOADED,
//       () => {
//         setLoaded(true);
//       },
//     );

//     const unsubscribeOpened = interstitial.addAdEventListener(
//       AdEventType.OPENED,
//       () => {
//         if (Platform.OS === 'ios') {
//           // Prevent the close button from being unreachable by hiding the status bar on iOS
//           StatusBar.setHidden(true);
//         }
//       },
//     );

//     const unsubscribeClosed = interstitial.addAdEventListener(
//       AdEventType.CLOSED,
//       () => {
//         if (Platform.OS === 'ios') {
//           StatusBar.setHidden(false);
//         }
//       },
//     );

//     // Start loading the interstitial straight away
//     interstitial.load();

//     // Unsubscribe from events on unmount
//     return () => {
//       unsubscribeLoaded();
//       unsubscribeOpened();
//       unsubscribeClosed();
//     };
//   }, []);

//   // No advert ready to show yet
//   if (!loaded) {
//     return null;
//   }

//   return (
//     <Button
//       title="Show Interstitial"
//       onPress={() => {
//         interstitial.show();
//       }}
//     />
//   );
// }
