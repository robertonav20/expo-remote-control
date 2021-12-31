import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
    pickerContainer: {
        color: '#2198f2',
        backgroundColor: 'white',
        borderColor: 'white',
        borderRadius: 50,
        borderStyle: undefined,
        margin: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    picker: {
        width: 300,
        height: 40,
        color: '#2198f2',
        fontSize: 20,
        fontFamily: 'Candara',
        borderColor: 'white',
        borderRadius: 50,
        borderStyle: undefined
    },
    pickerItem: {
        padding: 5,
        color: '#2198f2',
        backgroundColor: 'white',
        borderStyle: undefined
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
    text: {
        color: '#2198f2',
        fontSize: 20,
        fontFamily: 'Candara'
    },
    textBold: {
        color: '#2198f2',
        fontSize: 20,
        fontFamily: 'Candara',
        fontWeight: 'bold'
    }
});

export const volumeScreenStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
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
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexGrow: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    configurationContainer: {
        flexGrow: 4,
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center'
    },
    headerConfiguration: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    slider: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 15
    },
    middleConfiguration: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bottomConfiguration: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    inputContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    iconButton: {
        display: 'flex',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: '#2198f2',
        width: 'auto',
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
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    multimediaButtonContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    volumeButtonContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
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

export const configurationScreenStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexGrow: 3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
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
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    configurations: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2,
        margin: 20
    },
    protocolTextStyle: {
        fontSize: 20,
        color: '#2198f2',
        fontFamily: 'Candara'
    },
    parametersContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 3,
        height: 'auto',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%'
    }
})

export const httpScreenStyle = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        flex: 1,
        flexGrow: 3,
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingTop: 50,
    },
    buttonContainer: {
        position: 'relative',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 'auto',
    },
    deleteButton: {
        backgroundColor: '#f91b20',
        padding: 10,
        width: 'auto'
    },
    infoButton: {
        backgroundColor: '#2198f2',
        padding: 10,
        width: 'auto'
    },
    list: {
        width: '100%'
    },
    item: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 10
    },
    title: {
        fontSize: 20,
        color: '#2198f2',
        fontFamily: 'Candara'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalInfo: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 10
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        borderRadius: 5,
        padding: 10
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Candara',
        textAlign: 'center'
    },
    modalText: {
        fontSize: 20,
        color: '#2198f2',
        fontFamily: 'Candara'
    }
})

export const appScreenStyles = StyleSheet.create({
    navigation: {
        fontFamily: 'Candara'
    }
})

