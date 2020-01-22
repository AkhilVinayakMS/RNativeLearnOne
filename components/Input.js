import React from 'react';
import {View, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Input = props => {
    return(
        <TextInput {...props} style={{...styles.input,...props.style}}/>
    )
}
export default Input;

const styles= StyleSheet.create({
    input:{
        borderBottomColor: 'red',
        borderBottomWidth:1,
        marginVertical:10,
        height:30,
       
    }
})  