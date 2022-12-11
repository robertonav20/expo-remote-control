import React, { Component } from "react";
import { httpScreenStyle } from "../../Styles";
import { Text, View } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { ServerHttpEvent } from "../../utils/Interfaces";
import { Icon } from "@rneui/base";

export interface HttpItemProps {
  item: ServerHttpEvent;
  infoCallBack?: any;
  deleteCallBack?: any;
}

export default class HttpItem extends Component<HttpItemProps, {}> {
  constructor(props: Readonly<any>) {
    super(props);
  }

  actions = (value: number) => {
    if (value === 0) {
      this.props.infoCallBack(this.props.item);
    } else if (value === 1) {
      this.props.deleteCallBack(this.props.item);
    }
  };

  render() {
    return (
      <View style={httpScreenStyle.item}>
        <Text style={httpScreenStyle.title}>{this.props.item.name}</Text>
        <View style={httpScreenStyle.buttonContainer}>
          <View style={{ margin: 2 }}>
            <Icon
              name="info"
              type="feather"
              size={25}
              onPress={() => this.actions(0)}
              color="white"
              style={httpScreenStyle.infoButton}
            />
          </View>
          <View style={{ margin: 2 }}>
            <Icon
              name="delete"
              type="antdesign"
              size={25}
              color="white"
              onPress={() => this.actions(1)}
              style={httpScreenStyle.deleteButton}
            />
          </View>
        </View>
      </View>
    );
  }
}
