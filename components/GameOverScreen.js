import React from 'react';
import {View, Text, StyleSheet,Button} from 'react-native';

const GameOverScreen =props =>{
    return(
        <View style={styles.screen}>
            <Text>The Game is over!!</Text>
            <Text>The number of rounds:{props.noOfRounds}</Text>
            <Text>The number was: {props.userChoiceNum}</Text>
            <Button title="START NEW GAME" onPress={props.reStartGame} />
        </View>
    )
}
export default GameOverScreen;
const styles=StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    }
})