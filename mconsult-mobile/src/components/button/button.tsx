import React from "react";
import {Text, TouchableOpacity } from "react-native";
import styles from './button.style'

const button = function(props: { text: string; outline: boolean, theme: string, onPress: any }): React.JSX.Element{
    const stylesBackgroundList = []
    const stylesTextList = []
    stylesBackgroundList.push(styles.btn)
    stylesTextList.push(styles.text)
    if (props.theme == "primary") {
        if(props.outline){
            stylesBackgroundList.push(styles.out_primary)
            stylesTextList.push(styles.text_out_primary)
        }
        else{
            stylesBackgroundList.push(styles.primary)
        }
    }
    else {
        if(props.outline){
            stylesBackgroundList.push(styles.out_danger)
            stylesTextList.push(styles.text_out_danger)
        }
        else{
            stylesBackgroundList.push(styles.danger)
        }

    }
    return <TouchableOpacity style={stylesBackgroundList} onPress={props.onPress}>
        <Text style={stylesTextList}>
            {props.text}
        </Text>
    </TouchableOpacity>
};

export default button;