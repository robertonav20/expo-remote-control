import React, {Component} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import Axios, {AxiosInstance} from 'axios';
import Slider from '@react-native-community/slider';

const Separator = () => (
    <View style={styles.separator}/>
);

export default class ButtonBasics extends Component {
    private volume: number = 50;
    private min: number = 0;
    private max: number = 100;

    private basePath: string = 'https://localhost/';
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
        this.state = {text: this.volume};

        this.load();
    }

    load() {
        this._getVolume();
    }

    _onPressButton() {
        alert('Changed value!');
    }

    _onChangeValue = (value: number) => {
        try {
            if (value >= 0 && value <= 100) {
                this.setState({text: value})
                this.volume = value;
            } else {
                alert('The value not good! Set a value from 0 to 100')
            }
        } catch (e) {
            alert('Not a value number!')
        }
    }

    _decreaseVolume = () => {
        if (this.volume > this.min) {
            this.setState({text: this.volume - 1})
            this.volume -= 1
        } else {
            alert('Cannot decrease volume, min is reached!')
        }
    }

    _increaseVolume = () => {
        if (this.volume < this.max) {
            this.setState({text: this.volume + 1})
            this.volume += 1
        } else {
            alert('Cannot increase volume, max is reached!')
        }
    }

    _activeMute = () => {
        this.axios.put(this.basePath + 'volume/controller/muteOn')
            .then((response: any ) => {
                alert(response.data.message);
            })
            .catch((error: any) => {
                alert(error.message + " " + error.code);
            });
    }

    _disableMute = () => {
        this.axios.put('volume/controller/muteOff')
            .then((response: any ) => {
                alert(response.data.message);
            })
            .catch((error: any) => {
                alert(error.message + " " + error.code);
            });
    }

    _setVolume = () => {
        this.axios.put('volume/controller/changeVolume',
            {
                volume: this.volume
            })
            .then((response: any ) => {
                alert(response.data.message);
            })
            .catch((error: any) => {
                alert(error.message + " " + error.code);
            });
    }

    _getVolume = () => {
        this.axios.get('volume/controller/getVolume')
            .then((response: any ) => {
                this.volume = response.data.volume;
                this.setState({text: this.volume})
            })
            .catch((error: any) => {
                alert(error.message + " " + error.code);
            });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text>
                            Current Volume
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
                                value={this.state.text}
                                step={1}
                                onValueChange={this._onChangeValue}
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
        textAlign : 'center',
        height: 40,
        borderBottomWidth: 2,
        borderBottomColor: '#2198f2',
        marginBottom: 10
    },
    volumeTitle: {
        fontSize: 40,
        fontFamily: 'Arial, sans-serif'
    },
    header: {
        width: '100%',
        position: 'absolute',
        top: 10,
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
