import {View} from "react-native";
import {httpScreenStyle} from "./Styles";
import React, {Component} from "react";

export default class HttpScreen extends Component<{}, {}> {

    constructor(props: Readonly<any>) {
        super(props);
    }

    render() {
        return (
            <View style={httpScreenStyle.mainContainer}>
                <View style={httpScreenStyle.headerContainer}>
                </View>
                <View style={httpScreenStyle.middleContainer}>
                </View>
                <View style={httpScreenStyle.footerContainer}>
                </View>
            </View>
        )
    }
}
