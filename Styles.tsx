import {StyleSheet} from 'react-native';

export const volumeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-evenly',
        marginHorizontal: 16,
    },
    header: {
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    content: {
        flexGrow: 4
    },
    parameters : {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2,
        margin: 20
    },
    configuration: {
        flexGrow: 2
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        fontFamily: 'Candara'
    },
    fixToTextCenter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 5,
        fontSize: 24,
        fontFamily: 'Candara'
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInputStyle: {
        width: 'auto',
        textAlign: 'center',
        height: 40,
        borderBottomWidth: 2,
        borderBottomColor: '#2198f2',
        marginBottom: 10,
        fontSize: 20,
        fontFamily: 'Candara'
    },
    protocolTextStyle: {
        fontSize: 20,
        color: '#2198f2',
        fontFamily: 'Candara'
    },
    volumeTitle: {
        fontSize: 25,
        color: '#2198f2',
        fontFamily: 'Candara'
    },
    volumeValueTitle: {
        fontSize: 40,
        fontFamily: 'Candara',
        color: '#2198f2'
    },
    iconVolumeButton: {
        display: 'flex',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: '#2198f2',
        width: 'auto',
        margin: 0
    }
});

export const mouseScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export const keyboardScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export const multimediaScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50
    },
    shortcutsContainer: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    shutdownContainer: {

    },
    multimediaButtonContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    volumeButtonContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    mainContainer: {
        flex: 1,
        flexGrow: 3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        alignItems: 'center',
        borderColor: '#2198f2',
        backgroundColor: '#2198f2',
        borderRadius: 5,
        padding: 10,
        margin: 5,
        width: 'auto',
        height: 'auto'
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Candara',
    },
    icon: {
        display: 'flex',
        justifyContent: 'center',
        color: 'white',
        borderColor: '#2198f2',
        backgroundColor: 'orange',
        width: 40,
        height: 40
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export const appScreenStyles = StyleSheet.create({
    navigation: {
        fontFamily: 'Candara'
    }
})

