import {TouchableOpacity, View} from 'react-native';
import {multimediaScreenStyles} from '../Styles';
import React, {Component} from 'react';
import {AntDesign, Entypo, Feather, MaterialCommunityIcons, SimpleLineIcons} from '@expo/vector-icons';
import {_getVolume, _keyboardInputTrigger, _setVolume} from '../utils/Services';
import {showToast} from '../utils/Notification';

export default class MultimediaScreen extends Component<{}, { size: number, volume: number }> {
    private volume: number = 50;
    private max: number = 100;

    constructor(props: Readonly<any>) {
        super(props);

        this.state = {
            size: 24,
            volume: this.volume
        };

        this.load();
    }

    load() {
        this.getVolume();
    }

    onPress(keyEvents: string[]) {
        _keyboardInputTrigger(keyEvents)
            .then(message => showToast(message))
            .catch(message => showToast(message));
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

    changeVolume = (direction: string) => {
        if (direction === 'UP' && this.volume < this.max) {
            this.setState({volume: this.volume + 1})
            this.volume += 1;
            _setVolume(this.volume);
        } else if (direction === 'DOWN' && this.volume > 0) {
            this.setState({volume: this.volume - 1})
            this.volume -= 1;
            _setVolume(this.volume);
        } else {
            showToast('Cannot increase/decrease volume, max is reached!')
        }
    }

    render() {
        return (
            <View style={multimediaScreenStyles.container}>
                <View style={multimediaScreenStyles.shortcutsContainer}>
                    <View style={multimediaScreenStyles.shutdownContainer}>
                        <TouchableOpacity
                            style={multimediaScreenStyles.button}>
                            <Feather.Button name='power' size={this.state.size} color='white'
                                            onPress={() => this.onPress(['VK_ALT', 'VK_F4'])}
                                            style={{...multimediaScreenStyles.icon, backgroundColor: 'tomato'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={multimediaScreenStyles.button}>
                            <AntDesign.Button name='swap' size={this.state.size} color='white'
                                              onPress={() => this.onPress(['VK_ALT', 'VK_TAB'])}
                                              style={multimediaScreenStyles.icon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={multimediaScreenStyles.multimediaButtonContainer}>
                        <TouchableOpacity
                            style={multimediaScreenStyles.button}>
                            <Entypo.Button name='arrow-bold-up' size={this.state.size} color='white'
                                            onPress={() => this.onPress(['VK_HOME'])}
                                            style={multimediaScreenStyles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={multimediaScreenStyles.button}>
                            <Entypo.Button name='arrow-bold-down' size={this.state.size} color='white'
                                            onPress={() => this.onPress(['VK_END'])}
                                            style={multimediaScreenStyles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={multimediaScreenStyles.button}>
                            <Feather.Button name='chevrons-up' size={this.state.size} color='white'
                                            onPress={() => this.onPress(['VK_PAGE_UP'])}
                                            style={multimediaScreenStyles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={multimediaScreenStyles.button}>
                            <Feather.Button name='chevrons-down' size={this.state.size} color='white'
                                            onPress={() => this.onPress(['VK_PAGE_DOWN'])}
                                            style={multimediaScreenStyles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={multimediaScreenStyles.button}>
                            <MaterialCommunityIcons.Button name='play-pause' size={this.state.size} color='white'
                                                           onPress={() => this.onPress(['VK_SPACE'])}
                                                           style={multimediaScreenStyles.icon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={multimediaScreenStyles.volumeButtonContainer}>
                        <TouchableOpacity
                            style={multimediaScreenStyles.button}>
                            <SimpleLineIcons.Button name='volume-2' size={this.state.size} color='white'
                                                    onPress={() => this.changeVolume('UP')}
                                                    style={multimediaScreenStyles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={multimediaScreenStyles.button}>
                            <SimpleLineIcons.Button name='volume-1' size={this.state.size} color='white'
                                                    onPress={() => this.changeVolume('DOWN')}
                                                    style={multimediaScreenStyles.icon}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={multimediaScreenStyles.mainContainer}>
                    <View style={multimediaScreenStyles.headerContainer}>
                        <TouchableOpacity
                            style={multimediaScreenStyles.button}>
                            <Feather.Button name='arrow-up-circle' size={this.state.size} color='white'
                                            onPress={() => this.onPress(['VK_UP'])}
                                            style={multimediaScreenStyles.icon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={multimediaScreenStyles.centerContainer}>
                        <TouchableOpacity
                            style={multimediaScreenStyles.button}>
                            <SimpleLineIcons.Button name='arrow-left-circle' size={this.state.size} color='white'
                                                    onPress={() => this.onPress(['VK_LEFT'])}
                                                    style={multimediaScreenStyles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={multimediaScreenStyles.button}>
                            <AntDesign.Button name='logout' size={this.state.size} color='white'
                                              onPress={() => this.onPress(['VK_ENTER'])}
                                              style={{...multimediaScreenStyles.icon, backgroundColor: 'green'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={multimediaScreenStyles.button}>
                            <SimpleLineIcons.Button name='arrow-right-circle' size={this.state.size} color='white'
                                                    onPress={() => this.onPress(['VK_RIGHT'])}
                                                    style={multimediaScreenStyles.icon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={multimediaScreenStyles.footerContainer}>
                        <TouchableOpacity
                            style={multimediaScreenStyles.button}>
                            <SimpleLineIcons.Button name='arrow-down-circle' size={this.state.size} color='white'
                                                    onPress={() => this.onPress(['VK_DOWN'])}
                                                    style={multimediaScreenStyles.icon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
