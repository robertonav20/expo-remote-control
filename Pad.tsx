import React, {useRef} from "react";
import {Animated, PanResponder, StyleSheet, TextInput, View} from "react-native";

const Pad = (props: {
    moveCallback: any,
    useNativeDriver: boolean,
    backgroundColor: string,
    height: number | string;
    max: {
        x: number;
        y: number;
    };
}) => {
    const pan = useRef(new Animated.ValueXY()).current;

    let animate = Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: props.useNativeDriver});
    let animateOrigin = Animated.event([null, {
        dx: new Animated.Value(0),
        dy: new Animated.Value(0)
    }], {useNativeDriver: props.useNativeDriver});
    let backToZero = Animated.spring(pan, {useNativeDriver: props.useNativeDriver, toValue: {x: 0, y: 0}});

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gesture) => {
            props.moveCallback(gesture.dx, gesture.dy);
            if (Math.abs(gesture.dx) < props.max.x && Math.abs(gesture.dy) < props.max.y) animate(e, gesture);
            else animateOrigin(e, gesture);
        },
        onPanResponderRelease: () => {
            backToZero.start()
        }
    });

    const scroll = {
        flex: 1,
        flexGrow: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.backgroundColor ? props.backgroundColor : 'tomato',
        width: '100%',
        height: props.height ? props.height : '100%'
    }

    return (
        <View style={ scroll }>
            <Animated.View
                {...panResponder.panHandlers}
                style={[pan.getTranslateTransform(), styles.box]}
            />
        </View>
    );
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

export default Pad;