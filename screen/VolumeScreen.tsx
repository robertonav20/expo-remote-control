import React, { Component } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { Icon } from "@rneui/themed";
import { volumeScreenStyles } from "../Styles";
import {
  _activeMute,
  _disableMute,
  _getVolume,
  _setVolume,
} from "../utils/Services";
import { showToast } from "../utils/Notification";

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
  };

  _onChangeVolume = (value: number) => {
    try {
      if (value >= 0 && value <= 100) {
        this.setState({ volume: value });
        this.volume = value;
      } else {
        showToast("The value not good! Set a value from 0 to 100");
      }
    } catch (e) {
      showToast("Not a value number!");
    }
  };

  _decreaseVolume = () => {
    if (this.volume > this.min) {
      this.setState({ volume: this.volume - 1 });
      this.volume -= 1;
    } else {
      showToast("Cannot decrease volume, min is reached!");
    }
  };

  _increaseVolume = () => {
    if (this.volume < this.max) {
      this.setState({ volume: this.volume + 1 });
      this.volume += 1;
    } else {
      showToast("Cannot increase volume, max is reached!");
    }
  };

  activeMute = () => {
    _activeMute();
  };

  disableMute = () => {
    _disableMute();
  };

  setVolume = () => {
    _setVolume(this.volume);
  };

  getVolume = () => {
    _getVolume()
      .then((volume) => {
        this.volume = volume;
        this.setState({ volume: this.volume });
      })
      .catch(() => {
        this.volume = 50;
        this.setState({ volume: this.volume });
      });
  };

  render() {
    return (
      <SafeAreaView style={volumeScreenStyles.safeAreaContainer}>
        <View style={volumeScreenStyles.container}>
          <View style={volumeScreenStyles.header}>
            <View>
              <Text style={volumeScreenStyles.volumeTitle}>Volume</Text>
              <Icon
                name="tune"
                type="material"
                size={40}
                color="white"
                style={volumeScreenStyles.iconVolumeButton}
              />
            </View>
            <View>
              <Text style={volumeScreenStyles.volumeValueTitle}>
                {this.volume + "%"}
              </Text>
            </View>
          </View>
          <View style={volumeScreenStyles.middle}>
            <View style={volumeScreenStyles.configuration}>
              <Icon
                onPress={this._decreaseVolume}
                name="volume-1"
                type="simple-line-icon"
                size={24}
                color="white"
                style={volumeScreenStyles.iconVolumeButton}
              />
              <View style={volumeScreenStyles.slider}>
                <Slider
                  style={{ width: "70%", height: 40 }}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor={"#517fa4"}
                  thumbTintColor={"#517fa4"}
                  value={this.state.volume}
                  step={1}
                  onValueChange={this._onChangeVolume}
                />
              </View>
              <Icon
                onPress={this._increaseVolume}
                name="volume-2"
                type="simple-line-icon"
                size={24}
                color="white"
                style={volumeScreenStyles.iconVolumeButton}
              />
            </View>
          </View>
          <View style={volumeScreenStyles.bottom}>
            <Icon
              onPress={this.activeMute}
              name="mute"
              type="octicon"
              size={24}
              color="white"
              style={volumeScreenStyles.iconVolumeButton}
            />
            <Icon
              onPress={this.setVolume}
              name="upload"
              type="antdesign"
              size={24}
              color="white"
              style={volumeScreenStyles.iconVolumeButton}
            />
            <Icon
              onPress={this.disableMute}
              name="unmute"
              type="octicon"
              size={24}
              color="white"
              style={volumeScreenStyles.iconVolumeButton}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
