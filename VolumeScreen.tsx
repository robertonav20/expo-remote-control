import React, {Component} from 'react';
import {Picker, SafeAreaView, Switch, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {commonStyles, volumeScreenStyles} from './Styles';
import {AntDesign, Ionicons, Octicons, SimpleLineIcons} from '@expo/vector-icons';
import {_activeMute, _disableMute, _getVolume, _setVolume} from './Services';
import {
    _refreshBasePath,
    getServerConfiguration,
    HOSTNAME,
    PORT,
    PROTOCOLS,
    TIMEOUT,
    updateServerConfiguration
} from './Variables';
import {showToast} from './Notification';

export default class VolumeScreen extends Component<{}, { volume: number, protocol: boolean, hostname: string, port: number }> {
    private volume: number = 50;
    private min: number = 0;
    private max: number = 100;

    private hostname: string = HOSTNAME;
    private protocols: string[] = PROTOCOLS;
    private protocol: boolean = false;
    private port: number = PORT;
    private timeout: number = TIMEOUT;

    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            volume: this.volume,
            protocol: this.protocol,
            hostname: this.hostname,
            port: this.port
        };
    }

    componentDidMount() {
        getServerConfiguration()
            .then(configuration => {
                console.log('SERVER LOADING')

                this.protocol = configuration.protocol;
                this.hostname = configuration.hostname;
                this.port = configuration.port;
                this.timeout = configuration.timeout;
                this.setState({
                    volume: this.volume,
                    protocol: this.protocol,
                    hostname: this.hostname,
                    port: this.port
                });
                this.load();
            });
    }

    load = () => {
        this.getVolume();
    }

    refreshBasePath = () => {
        _refreshBasePath(this.protocol, this.hostname, this.port, this.timeout);
    }

    _toggleSwitch = () => {
        this.protocol = !this.protocol;
        this.setState({protocol: this.protocol});
        updateServerConfiguration(this.protocol, this.hostname, this.port, this.timeout);
    }

    _onChangeHostname = (value: string) => {
        try {
            if (value) {
                this.setState({hostname: value})
                this.hostname = value;
                updateServerConfiguration(this.protocol, this.hostname, this.port, this.timeout);
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
                this.setState({port: port});
                this.port = port;
                updateServerConfiguration(this.protocol, this.hostname, this.port, this.timeout);
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
            .catch(() => {
                this.volume = 50;
                this.setState({volume: this.volume})
            });
    }

    render() {
        return (
            <SafeAreaView style={volumeScreenStyles.container}>
                <View style={volumeScreenStyles.header}>
                    <View>
                        <Text style={volumeScreenStyles.volumeTitle}>
                            Volume
                        </Text>
                    </View>
                    <View>
                        <Text style={volumeScreenStyles.volumeValueTitle}>
                            {this.volume + '%'}
                        </Text>
                    </View>
                </View>
                <View style={volumeScreenStyles.content}>
                    <View style={volumeScreenStyles.parameters}>
                        <View style={volumeScreenStyles.fixToTextCenter}>
                            <Text style={volumeScreenStyles.protocolTextStyle}>{this.protocols[0]}</Text>
                            <Switch
                                trackColor={{false: "#767577", true: "#2198f2"}}
                                thumbColor={'#2198f2'}
                                ios_backgroundColor='#2198f2'
                                onValueChange={this._toggleSwitch}
                                value={this.state.protocol}
                            />
                            <Text style={volumeScreenStyles.protocolTextStyle}>{this.protocols[1]}</Text>
                        </View>
                        <View style={commonStyles.pickerContainer}>
                            <Picker
                                style={commonStyles.picker} itemStyle={commonStyles.pickerItem}
                                selectedValue={this.state.hostname}
                                onValueChange={(itemValue) => this._onChangeHostname(itemValue)}>
                                <Picker.Item label="LOCALHOST" value="localhost"/>
                                <Picker.Item label="PC - DESKTOP" value="DESKTOP-FIBGVH5"/>
                                <Picker.Item label="PC - EVERIS" value="MIL-JPL23Z2"/>
                            </Picker>
                        </View>
                        <View style={commonStyles.pickerContainer}>
                            <Picker
                                style={commonStyles.picker} itemStyle={commonStyles.pickerItem}
                                selectedValue={this.state.port}
                                onValueChange={(itemValue) => this._onChangePort(itemValue)}>
                                <Picker.Item label="STANDARD" value={8080}/>
                                <Picker.Item label="SECURED" value={443}/>
                            </Picker>
                        </View>
                    </View>
                    <View style={volumeScreenStyles.configuration}>
                        <View style={volumeScreenStyles.fixToText}>
                            <View style={[{width: "20%"}]}>
                                <SimpleLineIcons.Button onPress={this._decreaseVolume} name="volume-1" size={24}
                                                        color="white" style={volumeScreenStyles.iconVolumeButton}/>
                            </View>
                            <View style={volumeScreenStyles.fixToText}>
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
                                <SimpleLineIcons.Button onPress={this._increaseVolume} name="volume-2" size={24}
                                                        color="white" style={volumeScreenStyles.iconVolumeButton}/>
                            </View>
                        </View>
                        <View style={volumeScreenStyles.title}>
                            <AntDesign.Button onPress={this.setVolume} name="upload" size={24} color="white"
                                              style={volumeScreenStyles.iconVolumeButton}/>
                        </View>
                        <View style={volumeScreenStyles.fixToText}>
                            <View style={[{width: "30%"}]}>
                                <Ionicons.Button onPress={this.activeMute} name="volume-mute" size={24} color="white"
                                                 style={volumeScreenStyles.iconVolumeButton}/>
                            </View>
                            <View style={[{width: "30%"}]}>
                                <Octicons.Button onPress={this.disableMute} name="unmute" size={24} color="white"
                                                 style={volumeScreenStyles.iconVolumeButton}/>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}