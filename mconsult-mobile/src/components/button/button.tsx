import React from "react";
import { Button, Text, TouchableOpacity } from "react-native";
import styles from './button.style'

const button = function(props: { text: string; outline: boolean }): React.JSX.Element{
    return <TouchableOpacity style={props.outline? styles.btn_out_primary:styles.btn_primary}>
        <Text style={props.outline? styles.text_out_primary:styles.text_primary}>
            {props.text}
        </Text>
    </TouchableOpacity>
};

export default button;