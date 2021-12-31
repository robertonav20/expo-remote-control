import React, {Component} from 'react';
import {httpScreenStyle} from "../../Styles";
import {AntDesign} from "@expo/vector-icons";

export default class HttpClearButton extends Component<{}, {}> {

    constructor(props: Readonly<any>) {
        super(props);
    }

    render() {
        return (
            <AntDesign name='delete' size={25} color='white' style={httpScreenStyle.deleteButton}/>
        )
    }
}