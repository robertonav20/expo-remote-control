import { Picker } from "@react-native-picker/picker";
import { Switch, Text, View } from "react-native";
import { commonStyles, configurationScreenStyle } from "../Styles";
import React, { Component } from "react";
import {
  HOSTNAME,
  PORT,
  PROTOCOLS,
  TIMEOUT,
  updateServerConfiguration,
} from "../utils/HttpConfiguration";
import { showToast } from "../utils/Notification";
import { Icon } from "@rneui/base";

export default class ConfigurationScreen extends Component<
  {},
  { protocol: boolean; hostname: string; port: number; timeout: number }
> {
  private hostname: string = HOSTNAME;
  private protocols: string[] = PROTOCOLS;
  private protocol: boolean = false;
  private port: number = PORT;
  private timeout: number = TIMEOUT;

  constructor(props: Readonly<any>) {
    super(props);

    this.state = {
      protocol: this.protocol,
      hostname: this.hostname,
      port: this.port,
      timeout: this.timeout,
    };
  }

  _toggleSwitch = () => {
    this.protocol = !this.protocol;
    this.setState({ protocol: this.protocol });
    updateServerConfiguration(
      this.protocol,
      this.hostname,
      this.port,
      this.timeout
    );
  };

  _onChangeHostname = (value: string) => {
    try {
      if (value) {
        this.setState({ hostname: value });
        this.hostname = value;
        updateServerConfiguration(
          this.protocol,
          this.hostname,
          this.port,
          this.timeout
        );
      } else {
        showToast("The value not good! Cannot set a null value");
      }
    } catch (e) {
      showToast("Not valid value!");
    }
  };

  _onChangePort = (value: string) => {
    try {
      const port = Number(value);
      if (port) {
        this.setState({ port: port });
        this.port = port;
        updateServerConfiguration(
          this.protocol,
          this.hostname,
          this.port,
          this.timeout
        );
      }
    } catch (e) {
      showToast("The value isn't not a number");
    }
  };

  render() {
    return (
      <View style={configurationScreenStyle.safeAreaContainer}>
        <View style={configurationScreenStyle.container}>
          <View style={configurationScreenStyle.header}>
            <Text style={configurationScreenStyle.titleStyle}>
              HTTP Configuration
            </Text>
          </View>
          <View style={configurationScreenStyle.content}>
            <View style={commonStyles.fixToTextCenter}>
              <Text style={configurationScreenStyle.protocolTextStyle}>
                {this.protocols[0]}
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#517fa4" }}
                thumbColor={"#517fa4"}
                ios_backgroundColor="#517fa4"
                onValueChange={this._toggleSwitch}
                value={this.state.protocol}
              />
              <Text style={configurationScreenStyle.protocolTextStyle}>
                {this.protocols[1]}
              </Text>
            </View>
            <View style={commonStyles.pickerContainer}>
              <Picker
                style={commonStyles.picker}
                itemStyle={commonStyles.pickerItem}
                selectedValue={this.state.hostname}
                onValueChange={(itemValue) => this._onChangeHostname(itemValue)}
              >
                <Picker.Item label="LOCALHOST" value="localhost" />
                <Picker.Item label="PC - DESKTOP" value="desktop.home" />
              </Picker>
            </View>
            <View style={commonStyles.pickerContainer}>
              <Picker
                style={commonStyles.picker}
                itemStyle={commonStyles.pickerItem}
                selectedValue={this.state.port}
                onValueChange={(itemValue) => this._onChangePort(itemValue)}
              >
                <Picker.Item label="STANDARD" value={8080} />
                <Picker.Item label="SECURED" value={443} />
              </Picker>
            </View>
          </View>
        </View>
        <View />
        <View style={configurationScreenStyle.footerContainer}>
          <Text style={commonStyles.textBold}>
            {"Protocol: " + (this.state.protocol ? "HTTPS" : "HTTP")}
          </Text>
          <Text style={commonStyles.textBold}>
            {"Hostname: " + this.state.hostname}
          </Text>
          <Text style={commonStyles.textBold}>
            {"Port: " + this.state.port}
          </Text>
          <Text style={commonStyles.textBold}>
            {"Timeout: " + this.state.timeout}
          </Text>
        </View>
      </View>
    );
  }
}
