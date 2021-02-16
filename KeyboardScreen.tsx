import {View, Text} from "react-native";
import {keyboardScreenStyles} from "./Styles";
import React, {Component} from "react";

export default class KeyboardScreen extends Component {
    render() {
        return (
            <View style={keyboardScreenStyles.container}>
                <Text>KeyboardScreen</Text>
            </View>
        )
    }
}
