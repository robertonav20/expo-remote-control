import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {volumeScreenStyles} from './Styles';
import {AntDesign, Ionicons, Octicons, SimpleLineIcons} from '@expo/vector-icons';
import {_activeMute, _disableMute, _getVolume, _setVolume} from './Services';
import {showToast} from './Notification';

export default class VolumeScreen extends Component<{}, { volume: number }> {
    private volume: number = 50;
    private min: number = 0;
    private max: number = 100;

    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            volume: this.volume,
        };
    }

    componentDidMount() {
        this.load();
    }

    load = () => {
        this.getVolume();
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
                <View style={volumeScreenStyles.configurationContainer}>
                    <View style={volumeScreenStyles.headerConfiguration}>
                        <View style={[{width: '15%'}]}>
                            <SimpleLineIcons.Button onPress={this._decreaseVolume} name="volume-1" size={24}
                                                    color="white" style={volumeScreenStyles.iconVolumeButton}/>
                        </View>
                        <View style={volumeScreenStyles.slider}>
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
                        <View style={[{width: '15%'}]}>
                            <SimpleLineIcons.Button onPress={this._increaseVolume} name="volume-2" size={24}
                                                    color="white" style={volumeScreenStyles.iconVolumeButton}/>
                        </View>
                    </View>
                    <View style={volumeScreenStyles.bottomConfiguration}>
                        <View style={[{width: "30%"}]}>
                            <Ionicons.Button onPress={this.activeMute} name="volume-mute" size={24} color="white"
                                             style={volumeScreenStyles.iconVolumeButton}/>
                        </View>
                        <View>
                            <AntDesign.Button onPress={this.setVolume} name="upload" size={24} color="white"
                                              style={volumeScreenStyles.iconVolumeButton}/>
                        </View>
                        <View style={[{width: "30%"}]}>
                            <Octicons.Button onPress={this.disableMute} name="unmute" size={24} color="white"
                                             style={volumeScreenStyles.iconVolumeButton}/>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}