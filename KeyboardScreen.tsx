import React, {Component} from "react";
import {StyleSheet, TextInput, View} from "react-native";
import {keyboardScreenStyles} from "./Styles";
import {_keyboardInputTrigger} from "./Services";
import {showToast} from "./Notification";
import {KEYBOARD_MAP_SPECIAL} from "./Variables";
import {AntDesign} from '@expo/vector-icons';

export default class KeyboardScreen extends Component<{}, { text: string }> {
    constructor(props: any) {
        super(props);

        this.state = {
            text: ''
        }
    }

    onChangeText(text: string) {
        this.setState({
            text: text
        })
    }

    clearAll() {
        this.setState({
            text: ''
        })
        this.handleKeyDown('ClearAll')
    }

    handleKeyDown(e: any) {
        const key: string = typeof e === 'string' ? e : String(e.nativeEvent?.key)
        // @ts-ignore
        _keyboardInputTrigger(KEYBOARD_MAP_SPECIAL[key])
            .catch(message => showToast(message));
    }

    render() {
        return (
            <View style={keyboardScreenStyles.container}>
                <View style={keyboardScreenStyles.inputContainer}>
                    <TextInput style={styles.textInput}
                               onKeyPress={this.handleKeyDown}
                               editable={true}
                               onChangeText={(text) => this.onChangeText(text)}
                               value={this.state.text}/>
                    <AntDesign.Button name="delete" onPress={() => this.clearAll()} size={24}
                                      color="white" style={keyboardScreenStyles.iconButton}/>
                    <AntDesign.Button name="logout" onPress={() => this.handleKeyDown('Enter')} size={24}
                                      color="white" style={keyboardScreenStyles.iconButton}/>
                </View>
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    textInput: {
        padding: 10,
        borderRadius: 50,
        borderBottomLeftRadius: 50,
        backgroundColor: '#fff',
        color: '#2198f2',
        fontSize: 20,
        fontFamily: 'Candara',
        width: '70%',
        maxWidth: '70%'
    }
})