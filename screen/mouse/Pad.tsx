import React, {Component} from 'react';
import {Animated, PanResponder, StyleSheet, View, ViewStyle} from 'react-native';

export interface PadPropsComponent {
    moveCallback: any,
    useNativeDriver: boolean,
    backgroundColor: string,
    height: number | string;
    max: {
        x: number;
        y: number;
    }
}

export default class Pad extends Component<PadPropsComponent, { pan: any, panStateLock: boolean }> {
    private readonly animate: any;
    private readonly animateOrigin: any;
    private backToZero: any;
    private panResponder: any;
    private scroll = {
        flex: 1,
        flexGrow: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : 'tomato',
        width: '100%',
        height: this.props.height ? this.props.height : '100%'
    } as ViewStyle;

    constructor(props: PadPropsComponent) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY(),
            panStateLock: false
        };

        this.state.pan.addListener((event: any) => {
            if (!this.state.panStateLock) this.props.moveCallback(event.x, event.y)
        });
        this.animate = Animated.event([null, {dx: this.state.pan.x, dy: this.state.pan.y}], {
            useNativeDriver: this.props.useNativeDriver
        });
        this.animateOrigin = Animated.event([null, {
            dx: new Animated.Value(0),
            dy: new Animated.Value(0)
        }], {useNativeDriver: this.props.useNativeDriver});
        this.backToZero = Animated.spring(this.state.pan,
            {
                useNativeDriver: this.props.useNativeDriver,
                toValue: {x: 0, y: 0}
            }
        );

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gesture) => {
                if (Math.abs(gesture.dx) - 80 >= this.props.max.x || Math.abs(gesture.dy) - 80 >= this.props.max.y) this.animateOrigin(e, gesture);
                else this.animate(e, gesture);
                this.props.moveCallback(gesture.dx, gesture.dy);
                this.setState({panStateLock: false});
            },
            onPanResponderRelease: () => {
                this.setState({panStateLock: true});
                this.backToZero.start()
            }
        });
    }

    render() {
        return (
            <View style={this.scroll}>
                <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: this.props.backgroundColor,
                        borderStyle: 'solid',
                        borderColor: '#F2F2F2',
                        borderWidth: 2,
                        width: 80 + this.props.max.x,
                        height: 80 + this.props.max.y,
                        borderRadius: 80 + this.props.max.x,
                    }}>
                    <Animated.View
                        {...this.panResponder.panHandlers}
                        style={
                            {
                                transform: [{translateX: this.state.pan.x}, {translateY: this.state.pan.y}],
                                ...styles.box
                            }
                        }
                    />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        flexGrow: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        position: 'relative',
        backgroundColor: '#2198f2',
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    noValues: {}
});