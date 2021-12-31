import React, {Component} from 'react';
import {httpScreenStyle} from '../../Styles';
import {Feather} from '@expo/vector-icons';

export default class HttpShowButton extends Component<{}, {}> {

    constructor(props: Readonly<any>) {
        super(props);
    }

    render() {
        return (
            <Feather name='info' size={25} color='white' style={httpScreenStyle.infoButton}/>
        )
    }
}