import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Alert } from 'react-native';

const quizData = [
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
  { question: "What is the largest mammal?", options: ["Elephant", "Whale", "Shark", "Giraffe"], answer: "Whale" },
  { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"], answer: "Da Vinci" },
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "What is the square root of 16?", options: ["2", "4", "8", "16"], answer: "4" },
  { question: "Which country is the largest by land area?", options: ["USA", "Canada", "Russia", "China"], answer: "Russia" },
  { question: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], answer: "Vatican City" },
  { question: "Who invented the telephone?", options: ["Edison", "Tesla", "Bell", "Marconi"], answer: "Bell" },
  { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
  { question: "What is the fastest land animal?", options: ["Cheetah", "Lion", "Elephant", "Horse"], answer: "Cheetah" },
  { question: "What element does 'O' represent on the periodic table?", options: ["Oxygen", "Osmium", "Ozone", "Oganesson"], answer: "Oxygen" },
  { question: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Dickens", "Hemingway", "Austen"], answer: "Shakespeare" },
  { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: "Nile" },
  { question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Kyoto"], answer: "Tokyo" }
];

const QuizComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === quizData[currentStep].answer) {
      setScore(score + 1);
    }

    if (currentStep + 1 < quizData.length) {
      setCurrentStep(currentStep + 1);
    } else {
      Alert.alert("Quiz Completed", `Your score is ${score + (selectedAnswer === quizData[currentStep].answer ? 1 : 0)} out of 15`, [{ text: 'OK' }]);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Quiz - Question {currentStep + 1}</Text>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>{quizData[currentStep].question}</Text>
      {quizData[currentStep].options.map((option, index) => (
        <TouchableOpacity key={index} onPress={() => handleAnswer(option)} style={{ padding: 10, backgroundColor: '#ddd', marginBottom: 10, borderRadius: 5 }}>
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
      <Button title="Next" onPress={() => handleAnswer("")} disabled />
    </View>
  );
};

export default QuizComponent;