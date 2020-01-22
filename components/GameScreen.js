import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import NumberContainer from './NumberContainer';
import Card from './Card';


const generateRandonBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandonBetween(min, max, exclude)
    }
    else {
        return rndNum
    }
}


const GameScreen = props => {
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const [currentGuess, setCurrentGuess] = useState(generateRandonBetween(1, 100, props.userChoice))
    const [rounds,setRounds]= useState(0);
    // using this for useEffect hook 
    const {userChoice,onGameOver}=props;
    useEffect(()=>{
        if(currentGuess == userChoice){
            onGameOver(rounds)
        }
    },[currentGuess,userChoice,onGameOver ])
    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert("Don't lie", "You know that its wrong......", [{ text: 'Sorry!', style: 'cancel' }])
            return;
        };
        if (direction == 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess
        }
        const nextNumber = generateRandonBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setRounds(curRounds => setRounds(curRounds+1))
    }
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer style={styles.guessed}>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="Lower" onPress={nextGuessHandler.bind(this, 'lower')} />
                <Button title="Greater" onPress={nextGuessHandler.bind(this, 'greater')} />
            </Card>
        </View>
    )
}
export default GameScreen;
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
        alignItems: 'center'
    },
    guessed: {
        width: 120,
        borderColor: 'pink'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        //maxWidth:300,
        width: 300

    }
})