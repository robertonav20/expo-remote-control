import React from "react";
import {Button, StyleSheet, View} from "react-native";
import Pad from './Pad';

const Mouse = (props: {
        leftCallback: any,
        rightCallback: any,
        moveCallback: any,
        useNativeDriver: boolean,
        max: {
            x: number;
            y: number;
        };
    }) => {

    return (
        <View style={styles.container}>
            <View><Pad {...props}></Pad></View>
            <View style={styles.click}>
                <Button title={"Left Click"}  onPress={props.leftCallback}/>
                <Button title={"Right Click"}  onPress={props.rightCallback}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    click: {
        height: 100,
        width: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
});

export default Mouse;