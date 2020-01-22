import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font'
import Header from './components/Header';
import StartGameScreen from './components/StartGameScreen';
import GameScreen from './components/GameScreen'
import GameOverScreen from './components/GameOverScreen'
import { AppLoading } from 'expo';
const fetchFonts = async () => {
  await Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (<AppLoading startAsync={fetchFonts}
       onFinish={() => setDataLoaded(true)} 
       onError ={(err)=> console.log(err)}/>)
  }
  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds)
  }
  const resetAndStartNewGame = () => {
    setUserNumber(0);
    setGuessRounds(0)
  }
  let content = <StartGameScreen onStartGame={startGameHandler} />
  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen noOfRounds={guessRounds} userChoiceNum={userNumber} reStartGame={resetAndStartNewGame} />
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    
  },
  titleStyle:{
    fontFamily:'open-sans-bold',
  }
});
