import React, {Component} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View, ToastAndroid, Switch} from 'react-native';
import Axios, {AxiosInstance} from 'axios';
import Slider from '@react-native-community/slider';

const Separator = () => (
    <View style={styles.separator}/>
);

export default class ButtonBasics extends Component {
    private volume: number = 50;
    private min: number = 0;
    private max: number = 100;

    //private hostname: string = '192.168.1.176';
    private hostname: string = 'DESKTOP-FIBGVH5.home-life.hub';
    private protocols: string[] = ['HTTP', 'HTTPS'];
    private protocol: boolean = false;
    private port: number = 8080;


    private basePath: string = (this.protocol ? this.protocols[1] : this.protocols[0]) +
        '://' + this.hostname + ':' + this.port + '/';
    private timeout: number = 3000;

    private axios : AxiosInstance = Axios.create({
        baseURL: this.basePath,
        timeout: this.timeout,
        headers: {
            Accept: '*/*',
        }
    });

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            volume: this.volume,
            protocol: this.protocol,
            hostname: this.hostname,
            port: String(this.port),
        };

        this.load();
    }

    load() {
        this._getVolume();
    }

    showToast = (message: string) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    _onPressButton() {
        this.showToast('Changed value!');
    }

    _toggleSwitch = () => {
        this.protocol = !this.protocol;
        this.setState({protocol: this.protocol})

        this._refreshBasePath();
    }

    _refreshBasePath = () => {
        this.basePath = (this.protocol ? this.protocols[1] : this.protocols[0]) + '://' + this.hostname + ':' + this.port + '/';
        this.axios = Axios.create({
            baseURL: this.basePath,
            timeout: this.timeout,
            headers: {
                Accept: '*/*',
            }
        });
    }

    _onChangeHostname = (value: string) => {
        try {
            if (value) {
                this.setState({hostname: value})
                this.hostname = value;
                this._refreshBasePath();
            } else {
                this.showToast('The value not good! Cannot set a null value')
            }
        } catch (e) {
            this.showToast('Not valid value!')
        }
    }

    _onChangePort = (value: string) => {
        try {
            const port = Number(value);
            if (port) {
                this.setState({port: port})
                this.port = port;
                this._refreshBasePath();
            }
        } catch (e) {
            this.showToast('The value isn\'t not a number')
        }
    }

    _onChangeVolume = (value: number) => {
        try {
            if (value >= 0 && value <= 100) {
                this.setState({volume: value})
                this.volume = value;
            } else {
                this.showToast('The value not good! Set a value from 0 to 100')
            }
        } catch (e) {
            this.showToast('Not a value number!')
        }
    }

    _decreaseVolume = () => {
        if (this.volume > this.min) {
            this.setState({volume: this.volume - 1})
            this.volume -= 1
        } else {
            this.showToast('Cannot decrease volume, min is reached!')
        }
    }

    _increaseVolume = () => {
        if (this.volume < this.max) {
            this.setState({volume: this.volume + 1})
            this.volume += 1
        } else {
            this.showToast('Cannot increase volume, max is reached!')
        }
    }

    _activeMute = () => {
        this.axios.put(this.basePath + 'volume/controller/muteOn')
            .then((response: any ) => {
                this.showToast(response.data.message);
            })
            .catch((error: any) => {
                this.showToast(error.message + " " + error.code);
            });
    }

    _disableMute = () => {
        this.axios.put('volume/controller/muteOff')
            .then((response: any ) => {
                this.showToast(response.data.message);
            })
            .catch((error: any) => {
                this.showToast(error.message + " " + error.code);
            });
    }

    _setVolume = () => {
        this.axios.put('volume/controller/changeVolume',
            {
                volume: this.volume
            })
            .then((response: any ) => {
                this.showToast(response.data.message);
            })
            .catch((error: any) => {
                this.showToast(error.message + " " + error.code);
            });
    }

    _getVolume = () => {
        this.axios.get('volume/controller/getVolume')
            .then((response: any ) => {
                this.volume = response.data.volume;
                this.setState({volume: this.volume})
                this.showToast('Value refreshed!');
            })
            .catch((error: any) => {
                this.showToast(error.message + ' ' + error.code);
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
                                trackColor={{ false: "#767577", true: "#2198f2" }}
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
                </View>
                <View>
                    <View style={styles.title}>
                        <Button
                            title="Apply"
                            onPress={this._setVolume}
                        />
                    </View>
                </View>
                <Separator/>
                <View style={styles.fixToText}>
                    <View style={[{width: "30%"}]}>
                        <Button
                            title="Mute On"
                            onPress={this._activeMute}
                        />
                    </View>
                    <View style={[{width: "30%"}]}>
                        <Button
                            title="Mute Off"
                            onPress={this._disableMute}
                        />
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={[{width: "50%"}]}>
                        <Button
                            title="Refresh"
                            onPress={this._getVolume}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    fixToTextCenter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center"
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    textInputStyle: {
        width: 'auto',
        textAlign : 'center',
        height: 40,
        borderBottomWidth: 2,
        borderBottomColor: '#2198f2',
        marginBottom: 10
    },
    volumeTitle: {
        fontSize: 40,
    },
    header: {
        width: '100%',
        position: 'absolute',
        top: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    footer: {
        width: '100%',
        position: 'absolute',
        bottom: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
