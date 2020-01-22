import React, { useState ,useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Colors from '../constants/colors'
import Input from '../components/Input'
import Card from '../components/Card'
import NumberContainer  from '../components/NumberContainer'
const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [selectednumber, setSelectedNumber] = useState('')
    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }
    const resetInputHandler = () => {
        setEnteredValue('');
        setUserConfirmed(false)
    }
    let textOutput;
    const confirmInputHandler = () => {
        let choosenNumber = parseInt(enteredValue);
        if (choosenNumber <= 0) {
            Alert.alert(
                'Invalid Number',
                'Number should be between 1-99',
                [{text:'Okay',style:'destructive',onPress:resetInputHandler}]
            )
            return;
        }
        setUserConfirmed(true);
        setSelectedNumber(enteredValue);
        setEnteredValue('');
    }
    if (userConfirmed) {
        textOutput = (
        <Card><Text> The number you selected is </Text> 
        <NumberContainer>{selectednumber}</NumberContainer>
        <Button title="Start Game" onPress={()=>props.onStartGame(selectednumber)} />
        </Card>
        )
        Keyboard.dismiss()
    }
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.screen}>
                <Text style={styles.textOne}> The Game Screen!</Text>
                <View style={styles.inputContainer}>

                    <Text>Select a Number</Text>
                    <Input style={styles.textInput} autoCorrect={false}
                        keyboardType='number-pad' maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue} />
                    <View style={styles.buttonContainer}>
                        <Button title="Reset" onPress={() => { resetInputHandler() }} color={Colors.secondary} />
                        <Button title="Confirm" onPress={() => { confirmInputHandler() }} color={Colors.primary} />

                    </View>
                </View>
{textOutput}
            </View>
        </TouchableWithoutFeedback>
    )

}

export default StartGameScreen;
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    textOne: {
        padding: 20,
       fontFamily:'open-sans-bold',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowOpacity: 0.26,
        shadowRadius: 6,
        backgroundColor: 'white',
        elevation: 5,
        padding: 10,
        borderRadius: 20

    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    textInput: {
        width: 50,
        textAlign: 'center'
    }
})
