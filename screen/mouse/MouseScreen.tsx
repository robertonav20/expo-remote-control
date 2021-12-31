import {View} from 'react-native';
import {mouseScreenStyles} from '../../Styles';
import Mouse from './Mouse';
import React, {Component} from 'react';
import {_leftClick, _rightClick} from '../../utils/Services';

export default class MouseScreen extends Component {
    render() {
        return (
            <View style={mouseScreenStyles.container}>
                <Mouse leftCallback={_leftClick} rightCallback={_rightClick}/>
            </View>
        )
    }
}
