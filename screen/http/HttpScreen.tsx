import React, { Component } from "react";
import { FlatList, Modal, Text, TouchableHighlight, View } from "react-native";
import { httpScreenStyle } from "../../Styles";
import HttpItem from "./HttpItem";
import { getHttpEvents, removeHttpEvent } from "../../utils/HttpConfiguration";
import { ServerHttpEvent } from "../../utils/Interfaces";

export default class HttpScreen extends Component<
  {},
  {
    data: ServerHttpEvent[];
    modalElement: ServerHttpEvent | null;
    modalVisible: boolean;
  }
> {
  constructor(props: Readonly<any>) {
    super(props);

    this.state = {
      data: getHttpEvents(),
      modalElement: null,
      modalVisible: false,
    };

    // @ts-ignore
    this.props.navigation.addListener("focus", () => {
      this.setState({
        data: getHttpEvents(),
      });
    });
  }

  infoCallback = (item: any) => {
    this.setState({
      modalElement: item,
      modalVisible: true,
    });
  };

  deleteCallback = (item: any) => {
    removeHttpEvent(item);
    this.setState({
      data: getHttpEvents(),
    });
  };

  render() {
    return (
      <View style={httpScreenStyle.mainContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={httpScreenStyle.centeredView}>
            <View style={httpScreenStyle.modalView}>
              <View style={httpScreenStyle.modalInfo}>
                <Text style={httpScreenStyle.modalText}>
                  {this.state.modalElement?.name}
                </Text>
                <Text style={httpScreenStyle.modalText}>
                  {this.state.modalElement?.status}
                </Text>
                <Text style={httpScreenStyle.modalText}>
                  {this.state.modalElement?.path}
                </Text>
                <Text style={httpScreenStyle.modalText}>
                  {this.state.modalElement?.requestBody}
                </Text>
                <Text style={httpScreenStyle.modalText}>
                  {this.state.modalElement?.responseBody}
                </Text>
                <Text style={httpScreenStyle.modalText}>
                  {this.state.modalElement?.errorMessage}
                </Text>
              </View>
              <TouchableHighlight
                style={httpScreenStyle.buttonClose}
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Text style={httpScreenStyle.textStyle}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <FlatList
          data={getHttpEvents()}
          renderItem={(element) => {
            return (
              <HttpItem
                item={element.item}
                infoCallBack={this.infoCallback}
                deleteCallBack={this.deleteCallback}
              ></HttpItem>
            );
          }}
          keyExtractor={(item) => item.id}
          style={httpScreenStyle.list}
        />
      </View>
    );
  }
}
