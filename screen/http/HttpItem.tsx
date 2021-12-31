import React, {Component} from 'react';
import {httpScreenStyle} from "../../Styles";
import {Text, View} from "react-native";
import {AntDesign, Feather} from "@expo/vector-icons";

export interface HttpItemProps {
    item: any,
    infoCallBack?: any,
    deleteCallBack?: any
}

export default class HttpItem extends Component<HttpItemProps, { item: any }> {

    constructor(props: Readonly<any>) {
        super(props);

        this.state = {
            item: this.props.item
        }
    }

    actions = (value: number) => {
        console.log(this.state.item, value)
        if (value === 0) {
            this.props.infoCallBack(this.state.item)
        } else if (value === 1) {
            this.props.deleteCallBack(this.state.item)
        }
    };

    render() {
        return (
            <View style={httpScreenStyle.item}>
                <Text style={httpScreenStyle.title}>
                    {this.state.item.title}
                </Text>
                <View style={httpScreenStyle.buttonContainer}>
                    <View style={{margin: 2}}>
                        <Feather.Button name='info' size={25} onPress={() => this.actions(0)}
                                        color='white' style={httpScreenStyle.infoButton}/>
                    </View>
                    <View style={{margin: 2}}>
                        <AntDesign.Button name='delete' size={25} color='white' onPress={() => this.actions(1)}
                                          style={httpScreenStyle.deleteButton}/>
                    </View>
                </View>
            </View>
        )
    }
}