import React, {Component} from "react";
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Pad from './Pad';
import {Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {_moveCallback} from "./Services";
import TextInputIcon from "./TextInputIcon";

export interface MousePropsComponent {
    leftCallback: any,
    rightCallback: any,
    moveCallback?: any,
    useNativeDriver?: boolean,
    max?: {
        x: number;
        y: number;
    }
}

export default class Mouse extends Component<MousePropsComponent> {
    private dx: number = 0;
    private dy: number = 0;

    moveCallback(dx: number, dy: number) {
        this.dx = Math.round(dx * 100);
        this.dy = Math.round(dy * 100);
        console.log();
        // @ts-ignore
        this.setState({dx: Math.round(dx * 100)})
        // @ts-ignore
        this.setState({dy: Math.round(dy * 100)})
        _moveCallback(dx, dy, 1);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.padContainer}>
                    <Pad moveCallback={(dx: number, dy: number) => this.moveCallback(dx, dy)}
                         useNativeDriver={false} max={{x: 50, y: 50}}></Pad>
                </View>
                <View style={styles.coordinates}>
                    <TextInputIcon value={String(this.dx)} icon={"axis-x-arrow"} size={30} color={"#2198f2"}/>
                    <TextInputIcon value={String(this.dy)} icon={"axis-y-arrow"} size={30} color={"#2198f2"}/>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.props.leftCallback}>
                        <Text style={styles.buttonText}>Left Click</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.props.leftCallback}>
                        <Text style={styles.buttonText}>Left Click</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    padContainer: {
        width: '100%',
        flexGrow: 4
    },
    coordinates: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%'
    },
    buttonContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 5,
        width: '100%',
        flexGrow: 1
    },
    button: {
        alignItems: 'center',
        backgroundColor: "#2198f2",
        borderRadius: 5,
        padding: 10
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Candara'
    }
});