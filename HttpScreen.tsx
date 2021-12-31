import {FlatList, Modal, Pressable, SafeAreaView, Text, TouchableHighlight, View} from "react-native";
import React, {useState} from 'react';
import {httpScreenStyle} from "./Styles";
import {ButtonGroup} from "react-native-elements";
import {AntDesign, Feather} from "@expo/vector-icons";


const HttpScreen = () => {
    let data = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        }
    ];

    const [httpData, setHttpData] = useState(data);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalElement, setModalElement] = useState(null);
    const actions = (item: any, value: number) => {
        console.log(item, value)
        if (value === 0) {
            setModalElement(item);
            setModalVisible(true);
        } else if (value === 1) {
            setHttpData(httpData.filter(d => d.id !== item.id));
        }
    };
    const showButton = () => (
        <Feather name="info" size={25} color="white" style={httpScreenStyle.infoButton}/>
    );

    const clearButton = () => (
        <AntDesign name="delete" size={25} color="white" style={httpScreenStyle.deleteButton}/>
    );

    const renderItem = (element: any) => (
        <View style={httpScreenStyle.item}>
            <Text style={httpScreenStyle.title}>
                {element.item.title}
            </Text>
            <ButtonGroup
                buttons={[{element: showButton}, {element: clearButton}]}
                onPress={(value) => actions(element.item, value)}
                containerStyle={{borderRadius: 5}}>
            </ButtonGroup>
        </View>
    );

    return (
        <View style={httpScreenStyle.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={httpScreenStyle.centeredView}>
                    <View style={httpScreenStyle.modalView}>
                        <Text style={httpScreenStyle.modalText}>
                            { modalElement != null ? modalElement?.title : null}
                        </Text>
                        <TouchableHighlight
                            style={[httpScreenStyle.infoButton, httpScreenStyle.deleteButton]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={httpScreenStyle.textStyle}>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <FlatList
                data={httpData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={httpScreenStyle.list}
            />
        </View>
    );
}

export default HttpScreen;