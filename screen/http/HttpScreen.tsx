import {FlatList, Modal, Text, TouchableHighlight, View} from 'react-native';
import React, {Component} from 'react';
import {httpScreenStyle} from '../../Styles';
import HttpItem from "./HttpItem";

export default class HttpScreen extends Component<{}, {httpData: any, modalElement: any, modalVisible: boolean}> {

    data = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
            status: 200,
            path: 'PATH',
            request: 'BODY REQUEST',
            response: 'BODY RESPONSE'
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
            status: 200,
            path: 'PATH',
            request: 'BODY REQUEST',
            response: 'BODY RESPONSE'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
            status: 200,
            path: 'PATH',
            request: 'BODY REQUEST',
            response: 'BODY RESPONSE'
        }
    ];

    constructor(props: Readonly<any>) {
        super(props);

        this.state = {
            httpData: this.data,
            modalElement: null,
            modalVisible: false
        }
    }

    infoCallback = (item: any) => {
        this.setState({
            modalElement: item,
            modalVisible: true
        })
    }

    deleteCallback = (item: any) => {
        this.setState({
            httpData: this.state.httpData.filter(d => d.id !== item.id)
        })
    }

    render() {
        return (
            <View style={httpScreenStyle.centeredView}>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={httpScreenStyle.centeredView}>
                        <View style={httpScreenStyle.modalView}>
                            <View style={httpScreenStyle.modalInfo}>
                                <Text style={httpScreenStyle.modalText}>
                                    {this.state.modalElement?.title}
                                </Text>
                                <Text style={httpScreenStyle.modalText}>
                                    {this.state.modalElement?.status}
                                </Text>
                                <Text style={httpScreenStyle.modalText}>
                                    {this.state.modalElement?.path}
                                </Text>
                                <Text style={httpScreenStyle.modalText}>
                                    {this.state.modalElement?.request}
                                </Text>
                                <Text style={httpScreenStyle.modalText}>
                                    {this.state.modalElement?.response}
                                </Text>
                            </View>
                            <TouchableHighlight
                                style={httpScreenStyle.buttonClose}
                                onPress={() => this.setState({modalVisible: false})}
                            >
                                <Text style={httpScreenStyle.textStyle}>Close</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <FlatList
                    data={this.state.httpData}
                    renderItem={
                        (element) => {
                            return (
                                <HttpItem
                                    item={element.item}
                                    infoCallBack={this.infoCallback}
                                    deleteCallBack={this.deleteCallback}>
                                </HttpItem>
                            )
                        }}
                    keyExtractor={item => item.id}
                    style={httpScreenStyle.list}
                />
            </View>
        );
    }
}