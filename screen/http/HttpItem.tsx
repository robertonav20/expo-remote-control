import React, {Component} from 'react';
import {httpScreenStyle} from "../../Styles";
import {Text, View} from "react-native";
import {ButtonGroup} from "react-native-elements";
import HttpShowButton from "./HttpShowButton";
import HttpClearButton from "./HttpClearButton";

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
                <ButtonGroup
                    buttons={[{element: HttpShowButton}, {element: HttpClearButton}]}
                    onPress={(value) => this.actions(value)}
                    containerStyle={{borderRadius: 5}}>
                </ButtonGroup>
            </View>
        )
    }
}