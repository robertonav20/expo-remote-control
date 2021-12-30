import React, {Component} from "react";
import {Picker, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Pad from './Pad';
import {_getMouseLocation, _moveCallback} from "./Services";
import TextInputIcon from "./TextInputIcon";
import {showToast} from "./Notification";
import {commonStyles} from "./Styles";
import {getData, storeData} from "./Variables";

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

export default class Mouse extends Component<MousePropsComponent, { pressure: string, dx: number, dy: number }> {
    private dx: number = 0;
    private dy: number = 0;

    constructor(props: MousePropsComponent) {
        super(props);

        this.state = {
            dx: 0,
            dy: 0,
            pressure: '0.3'
        }

        this.load();
    }

    load() {
        this.getMouseLocation();
        this.getPressure();
    }

    getMouseLocation() {
        _getMouseLocation()
            .then(mouse => this.updateCoordinates(mouse))
            .catch((error: any) => {
                error ? showToast(error.message) : showToast('Something went wrong!');
            });
    }

    moveCallback(dx: number, dy: number) {
        _moveCallback(dx, dy, Number(this.state.pressure))
            .then(mouse => this.updateCoordinates(mouse));
    }

    updateCoordinates(mouse: any) {
        this.dx = Math.round(mouse.x);
        this.dy = Math.round(mouse.y);
        // @ts-ignore
        this.setState({dx: mouse.x})
        // @ts-ignore
        this.setState({dy: mouse.y});
    }

    updatePressure(pressure: string) {
        storeData('pressure', pressure).then(r => {
            // @ts-ignore
            this.setState({pressure: pressure});
        });
    }

    getPressure() {
        getData('pressure')
            .then(value => {
                if (value) {
                    this.setState({pressure: value});
                }
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.padContainer}>
                    <Pad moveCallback={(dx: number, dy: number) => this.moveCallback(dx, dy)}
                         useNativeDriver={false} max={{x: 300, y: 300}} height={'100%'}
                         backgroundColor={'lightgray'}></Pad>
                </View>
                <View style={styles.coordinates}>
                    <TextInputIcon value={String(this.dx)} icon={"axis-x-arrow"} size={30} color={"#2198f2"}/>
                    <TextInputIcon value={String(this.dy)} icon={"axis-y-arrow"} size={30} color={"#2198f2"}/>
                    <View style={commonStyles.pickerContainer}>
                        <Picker
                            style={commonStyles.picker} itemStyle={commonStyles.pickerItem}
                            selectedValue={this.state.pressure}
                            onValueChange={(itemValue) => this.updatePressure(itemValue)}>
                            <Picker.Item label="Sensibility : 10%" value="0.1"/>
                            <Picker.Item label="Sensibility : 20%" value="0.2"/>
                            <Picker.Item label="Sensibility : 30%" value="0.3"/>
                            <Picker.Item label="Sensibility : 40%" value="0.4"/>
                            <Picker.Item label="Sensibility : 50%" value="0.5"/>
                            <Picker.Item label="Sensibility : 60%" value="0.6"/>
                            <Picker.Item label="Sensibility : 70%" value="0.7"/>
                            <Picker.Item label="Sensibility : 80%" value="0.8"/>
                            <Picker.Item label="Sensibility : 90%" value="0.9"/>
                            <Picker.Item label="Sensibility : 100%" value="1"/>
                        </Picker>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.props.leftCallback}>
                        <Text style={styles.buttonText}>Left Click</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.props.rightCallback}>
                        <Text style={styles.buttonText}>Right Click</Text>
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