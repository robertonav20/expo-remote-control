import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: 'space-evenly',
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    fixToTextCenter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center"
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    textInputStyle: {
        width: 'auto',
        textAlign: 'center',
        height: 40,
        borderBottomWidth: 2,
        borderBottomColor: '#2198f2',
        marginBottom: 10
    },
    volumeTitle: {
        fontSize: 40,
    },
    mouseController: {
        position: "relative",
        margin: 5,
        bottom: 10
    },
    header: {
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    footer: {
        width: '100%',
        position: 'relative',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
