import React, {Component} from 'react';
import {Button, SafeAreaView, Switch, Text, TextInput, View} from 'react-native';
import Slider from '@react-native-community/slider';
import Pad from './Pad';
import {styles} from './Styles';

import {
    _activeMute,
    _disableMute,
    _getVolume, _leftClick, _moveCallback,
    _refreshBasePath, _rightClick,
    _setVolume,
    HOSTNAME,
    PORT,
    PROTOCOL,
    PROTOCOLS,
    TIMEOUT
} from './Services';
import {showToast} from './Notification';
import Mouse from "./Mouse";

const Separator = () => (
    <View style={styles.separator}/>
);

export default class ButtonBasics extends Component {
    private volume: number = 50;
    private min: number = 0;
    private max: number = 100;

    private hostname: string = HOSTNAME;
    private protocols: string[] = PROTOCOLS;
    private protocol: boolean = PROTOCOL;
    private port: number = PORT;
    private timeout: number = TIMEOUT;

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            volume: this.volume,
            protocol: this.protocol,
            hostname: this.hostname,
            port: String(this.port),
            gamepad: 'Not connected. Try pressing a key'
        };

        this.load();
    }

    load = () => {
        this.getVolume();
    }

    _onPressButton = () => {
        showToast('Changed value!');
    }

    _toggleSwitch = () => {
        this.protocol = !this.protocol;
        this.setState({protocol: this.protocol})
        this.refreshBasePath();
    }

    refreshBasePath = () => {
        _refreshBasePath(this.protocol, this.hostname, this.port, this.timeout);
    }

    _onChangeHostname = (value: string) => {
        try {
            if (value) {
                this.setState({hostname: value})
                this.hostname = value;
                this.refreshBasePath();
            } else {
                showToast('The value not good! Cannot set a null value')
            }
        } catch (e) {
            showToast('Not valid value!')
        }
    }

    _onChangePort = (value: string) => {
        try {
            const port = Number(value);
            if (port) {
                this.setState({port: port})
                this.port = port;
                this.refreshBasePath();
            }
        } catch (e) {
            showToast('The value isn\'t not a number')
        }
    }

    _onChangeVolume = (value: number) => {
        try {
            if (value >= 0 && value <= 100) {
                this.setState({volume: value})
                this.volume = value;
            } else {
                showToast('The value not good! Set a value from 0 to 100')
            }
        } catch (e) {
            showToast('Not a value number!')
        }
    }

    _decreaseVolume = () => {
        if (this.volume > this.min) {
            this.setState({volume: this.volume - 1})
            this.volume -= 1
        } else {
            showToast('Cannot decrease volume, min is reached!')
        }
    }

    _increaseVolume = () => {
        if (this.volume < this.max) {
            this.setState({volume: this.volume + 1})
            this.volume += 1
        } else {
            showToast('Cannot increase volume, max is reached!')
        }
    }

    activeMute = () => {
        _activeMute();
    }

    disableMute = () => {
        _disableMute();
    }

    setVolume = () => {
        _setVolume(this.volume);
    }

    getVolume = () => {
        _getVolume()
            .then(volume => {
                this.volume = volume;
                this.setState({volume: this.volume})
            })
            .catch((error: any) => {
                this.volume = 50;
                this.setState({volume: this.volume})
            });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text>
                            Volume
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.volumeTitle}>
                            {this.volume + '%'}
                        </Text>
                    </View>
                </View>
                <Separator/>
                <View>
                    <View style={{display: 'flex', flexDirection: 'column'}}>
                        <View style={styles.fixToTextCenter}>
                            <Text>{this.protocols[0]} </Text>
                            <Switch
                                trackColor={{false: "#767577", true: "#2198f2"}}
                                thumbColor={'#2198f2'}
                                ios_backgroundColor='#2198f2'
                                onValueChange={this._toggleSwitch}
                                value={this.state.protocol}
                            />
                            <Text> {this.protocols[1]}</Text>
                        </View>
                        <View style={styles.fixToTextCenter}>
                            <TextInput
                                style={styles.textInputStyle}
                                onChangeText={this._onChangeHostname}
                                value={this.state.hostname}
                            />
                        </View>
                        <View style={styles.fixToTextCenter}>
                            <TextInput
                                style={styles.textInputStyle}
                                onChangeText={this._onChangePort}
                                value={this.state.port}
                            />
                        </View>
                    </View>
                    <Separator/>
                    <View style={styles.fixToText}>
                        <View style={[{width: "20%"}]}>
                            <Button
                                title="-"
                                onPress={this._decreaseVolume}
                            />
                        </View>
                        <View style={styles.fixToText}>
                            <Slider
                                style={{width: 200, height: 40}}
                                minimumValue={0}
                                maximumValue={100}
                                minimumTrackTintColor={'#2198f2'}
                                thumbTintColor={'#2198f2'}
                                value={this.state.volume}
                                step={1}
                                onValueChange={this._onChangeVolume}
                            />
                        </View>
                        <View style={[{width: "20%"}]}>
                            <Button
                                title="+"
                                onPress={this._increaseVolume}
                            />
                        </View>
                    </View>
                    <View style={styles.title}>
                        <Button
                            title="Apply"
                            onPress={this.setVolume}
                        />
                    </View>
                    <View style={styles.fixToText}>
                        <View style={[{width: "30%"}]}>
                            <Button
                                title="Mute On"
                                onPress={this.activeMute}
                            />
                        </View>
                        <View style={[{width: "30%"}]}>
                            <Button
                                title="Mute Off"
                                onPress={this.disableMute}
                            />
                        </View>
                    </View>
                </View>
                <Separator/>
                <View style={styles.mouseController}>
                    <Mouse
                        moveCallback={(dx: number, dy: number) => _moveCallback(dx, dy, 1)}
                        leftCallback={_leftClick}
                        rightCallback={_rightClick}
                        useNativeDriver={false} max={{x: 50, y: 50}}/>
                </View>
                <Separator/>
                <View style={styles.footer}>
                    <View style={[{width: "50%"}]}>
                        <Button
                            title="Refresh"
                            onPress={this.getVolume}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}