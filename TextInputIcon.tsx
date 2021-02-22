import React, {Component} from "react";
import {StyleSheet, TextInput, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export interface TextInputIconPropsComponent {
    value: string,
    icon?: string,
    size?: number,
    color?: string
}

export default class TextInputIcon extends Component<TextInputIconPropsComponent> {
    constructor(props: TextInputIconPropsComponent) {
        super(props);
    }

    render() {
        return (
            <View style={styles.textSection}>
                <TextInput
                    style={ this.props.color ? { ...styles.input, color: this.props.color } : styles.input}
                    value={this.props.value}
                    underlineColorAndroid="transparent"
                    editable={false}
                />
                <MaterialCommunityIcons style={styles.textIcon} name={this.props.icon} size={this.props.size} color={this.props.color}/>
            </View>
        )
    }
}
export const styles = StyleSheet.create({
    textSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        marginLeft: 35,
        marginRight: 35,
        width: 300,
        height: 40,
        margin: 10
    },
    textIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        marginLeft: 10,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        backgroundColor: '#fff',
        color: '#2198f2',
        fontSize: 20,
        fontFamily: 'Candara'
    }
});